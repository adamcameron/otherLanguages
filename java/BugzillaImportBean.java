/*
 * Copyright (c) 2002-2004
 * All rights reserved.
 */

package com.atlassian.jira.util;

import com.atlassian.core.action.ActionUtils;
import com.atlassian.core.ofbiz.CoreFactory;
import com.atlassian.core.user.UserUtils;
import com.atlassian.core.util.FileUtils;
import com.atlassian.jira.ComponentManager;
import com.atlassian.jira.action.ActionNames;
import com.atlassian.jira.action.project.ProjectUtils;
import com.atlassian.jira.config.ConstantsManager;
import com.atlassian.jira.exception.CreateException;
import com.atlassian.jira.external.ExternalUtils;
import com.atlassian.jira.issue.*;
import com.atlassian.jira.issue.attachment.Attachment;
import com.atlassian.jira.issue.cache.CacheManager;
import com.atlassian.jira.issue.context.GlobalIssueContext;
import com.atlassian.jira.issue.customfields.CustomFieldSearcher;
import com.atlassian.jira.issue.customfields.CustomFieldType;
import com.atlassian.jira.issue.fields.CustomField;
import com.atlassian.jira.issue.fields.screen.issuetype.IssueTypeScreenSchemeManager;
import com.atlassian.jira.issue.history.ChangeItemBean;
import com.atlassian.jira.issue.history.ChangeLogUtils;
import com.atlassian.jira.issue.index.IndexException;
import com.atlassian.jira.issue.index.IssueIndexManager;
import com.atlassian.jira.issue.link.IssueLinkManager;
import com.atlassian.jira.issue.link.IssueLinkType;
import com.atlassian.jira.issue.link.IssueLinkTypeManager;
import com.atlassian.jira.issue.vote.VoteManager;
import com.atlassian.jira.permission.PermissionSchemeManager;
import com.atlassian.jira.project.ProjectManager;
import com.atlassian.jira.project.component.ProjectComponentManager;
import com.atlassian.jira.project.version.Version;
import com.atlassian.jira.project.version.VersionManager;
import com.atlassian.jira.scheme.SchemeManager;
import com.atlassian.jira.security.PermissionManager;
import com.atlassian.jira.security.Permissions;
import com.atlassian.jira.util.map.EasyMap;
import com.atlassian.jira.web.action.admin.customfields.CreateCustomField;
import com.atlassian.jira.web.action.util.BugzillaConnectionBean;
import com.atlassian.jira.workflow.WorkflowFunctionUtils;
import com.opensymphony.user.EntityNotFoundException;
import com.opensymphony.user.User;
import com.opensymphony.util.TextUtils;
import com.opensymphony.workflow.InvalidInputException;
import com.opensymphony.workflow.InvalidRoleException;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.log4j.Category;
import org.apache.log4j.Priority;
import org.apache.oro.text.regex.*;
import org.ofbiz.core.entity.GenericDelegator;
import org.ofbiz.core.entity.GenericEntityException;
import org.ofbiz.core.entity.GenericValue;
import org.ofbiz.core.util.UtilDateTime;
import webwork.dispatcher.ActionResult;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

public class BugzillaImportBean
{
    private static final Category log4jLog = Category.getInstance(BugzillaImportBean.class);
    private static final String BUGZILLA_CHANGE_ITEM_FIELD = "Bugzilla Import Key";
    private static final SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
    private final IssueIndexManager indexManager;
    private final GenericDelegator genericDelegator;
    private final ProjectManager projectManager;
    private final SchemeManager permissionSchemeManager;
    private final CacheManager cacheManager;
    private final VersionManager versionManager;
    private final VoteManager voteManager;
    private final ProjectComponentManager projectComponentManager;
    private final IssueManager issueManager;
    private final AttachmentManager attachmentManager;
    private final IssueTypeScreenSchemeManager issueTypeScreenSchemeManager;
    private final CustomFieldManager customFieldManager;
    private final PermissionManager permissionManager;
    private IssueLinkManager issueLinkManager;
    private IssueLinkTypeManager issueLinkTypeManager;
    private ConstantsManager constantsManager;
    private ExternalUtils externalUtils;

    StringBuffer importLog = null;

    //these are cached lookups to save us having to go to the database each time.
    private Map userKeys = new HashMap(255);
    private Map projectKeys = new HashMap();

    // Map from Bugzilla user id to Jira User
    private Map versionKeys = new HashMap();
    private Map componentKeys = new HashMap();

    // bugzilla -> jira issue key mappings
    private Map previouslyImportedKeys = new HashMap(); // issues imported at any time (this or earlier runs)
    private Map importedKeys = new HashMap(); // Map of bugzilla ids (Integer) to Jira ids (Long) of issues imported during this run
    private String selectedProjects;
    private User importer;
    private BugzillaMappingBean bugzillaMappingBean;
    private boolean reuseExistingUsers;
    private boolean workHistory;
    private Map projectToBugzillaIdMap = new HashMap();
    private boolean oldBugzilla; // Whether Bugzilla is 2.16 or earlier
    private boolean onlyNewIssues;

    IssueLinkType dependencyLinkType;

    public static final String BUGZILLA_ID_TYPE = "importid";
    public static final String BUGZILLA_ID_SEARCHER = "exactnumber";
    public static final String BUGZILLA_ID_CF_NAME = "Bugzilla Id";
    private CustomField bugzillaIdCustomField;
    private boolean cryptedPasswords = false;
    private PreparedStatement profilePS;
    private PreparedStatement componentPS;
    private PreparedStatement productPS;
    private PreparedStatement commentPS;

    public BugzillaImportBean(IssueIndexManager indexManager, GenericDelegator genericDelegator, ProjectManager projectManager, PermissionSchemeManager permissionSchemeManager, CacheManager cacheManager,
                              VersionManager versionManager, VoteManager voteManager, ProjectComponentManager projectComponentManager, CustomFieldManager customFieldManager, IssueManager issueManager,
                              AttachmentManager attachmentManager, IssueTypeScreenSchemeManager issueTypeScreenSchemeManager, PermissionManager permissionManager, IssueLinkManager issueLinkManager, IssueLinkTypeManager issueLinkTypeManager, ConstantsManager constantsManager, ExternalUtils externalUtils)
    {
        this.indexManager = indexManager;
        this.genericDelegator = genericDelegator;
        this.projectManager = projectManager;
        this.permissionSchemeManager = permissionSchemeManager;
        this.cacheManager = cacheManager;
        this.versionManager = versionManager;
        this.voteManager = voteManager;
        this.projectComponentManager = projectComponentManager;
        this.customFieldManager = customFieldManager;
        this.issueManager = issueManager;
        this.attachmentManager = attachmentManager;
        this.issueTypeScreenSchemeManager = issueTypeScreenSchemeManager;
        this.permissionManager = permissionManager;
        this.issueLinkManager = issueLinkManager;
        this.issueLinkTypeManager = issueLinkTypeManager;
        this.constantsManager = constantsManager;
        this.externalUtils = externalUtils;
    }

    /**
     * Main method of this bean.  Creates JIRA projects mirroring those found in a Bugzilla database.
     *
     * @param bugzillaMappingBean Mappings from Bugzilla to JIRA, including project key, statuses, etc
     * @param enableNotifications Whether to send email notifications for newly created issues
     * @param reuseExistingUsers  Do we try to reuse existing users, or create a unique user for every Bugzilla user?
     * @param onlyNewIssues       Should we only import issues that haven't previously been imported (to avoid duplicates)?
     * @param reindex             Whether to reindex after the import
     * @param projectNames        Array of Bugzilla project names to import
     * @param importer
     * @throws Exception
     * @throws IndexException
     * @throws GenericEntityException
     */
    public void create(BugzillaMappingBean bugzillaMappingBean, BugzillaConnectionBean connectionBean, boolean enableNotifications, boolean reuseExistingUsers, boolean onlyNewIssues, boolean reindex, boolean workHistory, String[] projectNames, User importer) throws Exception, IndexException, GenericEntityException
    {
        importLog = new StringBuffer(1024 * 30);
        if (projectNames.length == 0)
        {
            log("No projects selected for import");
            return;
        }
        this.bugzillaMappingBean = bugzillaMappingBean;
        this.reuseExistingUsers = reuseExistingUsers;
        this.onlyNewIssues = onlyNewIssues;
        this.workHistory = workHistory;

        //todo - clear userKeys, projectKeys etc
        this.importer = importer;

        try
        {
            long starttime = System.currentTimeMillis();

            createOrFindCustomFields();
            createOrFindDependencies();

            this.selectedProjects = getProjectList(projectNames);

            Connection conn = connectionBean.getConnection();
            createPreparedStatements(conn);
            oldBugzilla = isOldBugzilla(conn); // Set flag if using Bugzilla 2.16 or earlier

            ImportUtils.setSubvertSecurityScheme(true);
            if (reindex) ImportUtils.setIndexIssues(false);
            ImportUtils.setEnableNotifications(enableNotifications);

            createProjects(conn);
            createVersions(conn);
            createComponents(conn);

            // if non-lazy: createUsers();

            createIssues(conn);

            rewriteBugLinks();

            ImportUtils.setSubvertSecurityScheme(false); // before the reindex, so pico-instantiated-during-reindex components don't get the wrong thing. JRA-7638
            if (reindex) ImportUtils.setIndexIssues(true);
            createVotes(conn);
            if (reindex)
            {
                log("Reindexing (this may take a while)...");
                indexManager.reIndexAll();
            }

            long endtime = System.currentTimeMillis();
            log("\nImport SUCCESS and took: " + (endtime - starttime) + " ms.");
        }
        finally
        {
            closePreparedStatements();
            connectionBean.closeConnection();
            ImportUtils.setSubvertSecurityScheme(false); // do again just in case we failed before the reindex
            if (reindex) ImportUtils.setIndexIssues(true);
            if (!enableNotifications)
            {
                ImportUtils.setEnableNotifications(true);
            }
        }
    }

    private void createPreparedStatements(Connection conn) throws SQLException
    {
        componentPS = conn.prepareStatement("select name from components where id = ?");
        productPS = conn.prepareStatement("select name from products where id = ?");
        if (tableHasColumn(conn, "profiles", "cryptpassword"))
        {
            cryptedPasswords = true;
            profilePS = conn.prepareStatement("SELECT userid, login_name, realname FROM profiles where userid = ?");
        }
        else
        {
            cryptedPasswords = false;
            profilePS = conn.prepareStatement("SELECT userid, login_name, realname, password FROM profiles where userid = ?");
        }
        commentPS = conn.prepareStatement("SELECT thetext, who, bug_when FROM longdescs WHERE bug_id = ?  ORDER BY bug_when ASC");
    }
    private void closePreparedStatements() throws SQLException
    {
        if (componentPS != null) componentPS.close();
        if (productPS != null) productPS.close();
        if (profilePS != null) profilePS.close();
        if (commentPS != null) commentPS.close();
    }

    /**
     * Generate SQL-friendly quoted comma-separated list of projects.
     */
    public String getProjectList(String[] projectNames)
    {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < projectNames.length; i++)
        {
            sb.append("'").append(projectNames[i]).append("'");
            if (i != projectNames.length - 1)
                sb.append(", ");
        }
        return sb.toString();
    }

    private void createIssues(Connection conn) throws Exception, GenericEntityException, InvalidRoleException, InvalidInputException, CreateException
    {
        int count = 0;
        log("\n\nImporting Issues from project(s) " + this.selectedProjects);

        // use the changeItem importLog to retrieve the list of issues previously imported from Bugzilla
        previouslyImportedKeys = retrieveImportedIssues();

        String sql = "SELECT * FROM bugs where ";
        if (oldBugzilla)
            sql += "product in (" + this.selectedProjects + ")";
        else
            sql += whereSelectedProjectClauseForVersionsAndComponents();

        PreparedStatement preparedStatement = conn.prepareStatement(sql);
        ResultSet resultSet = preparedStatement.executeQuery();
        importedKeys = new HashMap();

        PreparedStatement attachPrepStatement = conn.prepareStatement("SELECT * FROM attachments WHERE bug_id = ? ORDER BY attach_id ASC");
        PreparedStatement linkDependsOnPrepStatement = conn.prepareStatement("SELECT dependson FROM dependencies WHERE blocked = ?");
        PreparedStatement linkBlocksPrepStatement = conn.prepareStatement("SELECT blocked FROM dependencies WHERE dependson = ?");
        while (resultSet.next())
        {
            if (!onlyNewIssues || !previouslyImportedKeys.containsKey(new Integer(resultSet.getInt("bug_id"))))
            {
                log("Importing Issue: \"" + resultSet.getString("short_desc") + "\"");

                String componentName = null;
                try
                {
                    componentName = resultSet.getString("component");
                }
                catch (SQLException e)
                {
                    componentName = getComponentName(resultSet.getInt("component_id"));
                }

                try
                {
                    GenericValue issue = createIssue(resultSet, conn, getProductName(resultSet, true), componentName);
                    createCommentAndDescription(conn, resultSet.getInt("bug_id"), issue);
                    // NOTE: this call has not been tested, we are waiting for test data, that is why it is surrounded
                    // in a conditional
                    if (workHistory)
                    {
                        createWorkHistory(conn, resultSet.getInt("bug_id"), issue);
                    }
                    createAttachments(conn, attachPrepStatement, resultSet.getInt("bug_id"), issue);
                    createLinks(linkBlocksPrepStatement, linkDependsOnPrepStatement, resultSet.getInt("bug_id"), issue);
                }
                catch (Exception e)
                {
                    log("Exception processing bug id " + resultSet.getInt("bug_id"));
                    throw (e);
                }

                count++;
            }
            else
            {
                log("Not re-importing issue: \"" + resultSet.getString("short_desc") + "\"");
            }
        }
        log(count + " issues imported from Bugzilla.");

        closePS(preparedStatement);
        closePS(attachPrepStatement);
        closePS(linkBlocksPrepStatement);
        closePS(linkDependsOnPrepStatement);
    }

    private String getComponentName(final int componentId) throws SQLException
    {
        String name = null;
        componentPS.setInt(1, componentId);
        ResultSet rs = componentPS.executeQuery();
        rs.next();
        name = rs.getString("name");
        rs.close();
        return name;
    }

    private GenericValue createIssue(ResultSet resultSet, Connection conn, String productName, String componentName) throws IndexException, SQLException, GenericEntityException, CreateException
    {
        Map fields = new HashMap();
        MutableIssue issueObject = (MutableIssue) JiraUtils.loadComponent(IssueImpl.class);
        issueObject.setProject(getProject(productName));
        issueObject.setReporter(getUser(resultSet.getInt("reporter")));
        issueObject.setAssignee(getUser(resultSet.getInt("assigned_to")));
        if (resultSet.getString("bug_severity").equals("enhancement"))
            issueObject.setIssueTypeId(getEnhancementIssueTypeId());
        else
            issueObject.setIssueTypeId(getBugIssueTypeId());

        issueObject.setSummary(resultSet.getString("short_desc"));
        // Make sure that the priority is in lower case. JRA-9586
        String priorityString = resultSet.getString("bug_severity");
        if (priorityString != null)
            priorityString = priorityString.toLowerCase();
        issueObject.setPriorityId(bugzillaMappingBean.getPriority(priorityString));
        issueObject.setEnvironment("Operating System: " + resultSet.getString("op_sys") + "\nPlatform: " + resultSet.getString("rep_platform"));

        // setup the associations with components/versions
        String version = resultSet.getString("version");
        String fixversion = resultSet.getString("target_milestone");
        createVersionComponentAssociations(issueObject, productName, version, componentName, fixversion);

        // NOTE: this call has not been tested, we are waiting for test data, that is why it is surrounded
        // in a conditional
        if (workHistory && !resultSet.getString("estimated_time").equals(""))
        {
            long time_original_estimate, time_estimate, time_remaining;
            time_original_estimate = (long) (3600.0 * resultSet.getFloat("estimated_time"));
            time_estimate = time_original_estimate;
            time_remaining = (long) (3600.0 * resultSet.getFloat("remaining_time"));

            issueObject.setOriginalEstimate(new Long(time_original_estimate));
            issueObject.setTimeSpent(new Long(time_remaining));
        }
        fields.put("issue", issueObject);
        GenericValue origianlIssueGV = ComponentManager.getInstance().getIssueManager().getIssue(issueObject.getId());
        fields.put(WorkflowFunctionUtils.ORIGNAL_ISSUE_KEY, IssueImpl.getIssueObject(origianlIssueGV));

        GenericValue issue = issueManager.createIssue(importer, fields);

        String jiraBugStatus = bugzillaMappingBean.getStatus(resultSet.getString("bug_status"));
        issue.set(IssueFieldConstants.STATUS, jiraBugStatus);

        // make sure no resolution if the issue is unresolved
        if (!"5".equals(jiraBugStatus) && !"6".equals(jiraBugStatus))
            issue.set(IssueFieldConstants.RESOLUTION, null);
        else
            issue.set(IssueFieldConstants.RESOLUTION, bugzillaMappingBean.getResolution(resultSet.getString("resolution")));

        issue.set(IssueFieldConstants.CREATED, resultSet.getTimestamp("creation_ts"));
        issue.store();
        setCurrentWorkflowStep(issue);

        final int bugzillaId = resultSet.getInt("bug_id");
        createChangeHistory(bugzillaId, issue);
        previouslyImportedKeys.put(new Integer(bugzillaId), issue.getLong("id"));

        importedKeys.put(new Integer(bugzillaId), issue.getLong("id"));

        // Create custom field value for the issue
        if (bugzillaIdCustomField != null)
        {
            bugzillaIdCustomField.createValue(IssueImpl.getIssueObject(issue), new Double(bugzillaId));

            indexManager.reIndex(issue);
        }
        else
        {
            log("Bugzilla Id customfield not found. Bugzilla Id not added.");
        }

        return issue;
    }

    private String getEnhancementIssueTypeId()
    {
        if (constantsManager.getIssueType(BugzillaMappingBean.JIRA_ENHANCEMENT_ISSUE_TYPE_ID) != null)
        {
            return BugzillaMappingBean.JIRA_ENHANCEMENT_ISSUE_TYPE_ID;
        }
        else
        {
            log("ERROR: JIRA does not have an enhancement issue type with id "+BugzillaMappingBean.JIRA_ENHANCEMENT_ISSUE_TYPE_ID+"; creating as Bug instead");
            return getBugIssueTypeId();
        }
    }

    private String getBugIssueTypeId()
    {
        if (constantsManager.getIssueType(BugzillaMappingBean.JIRA_BUG_ISSUE_TYPE_ID) != null)
        {
            return BugzillaMappingBean.JIRA_BUG_ISSUE_TYPE_ID;
        }
        else
        {
            Collection issueTypes = constantsManager.getIssueTypes();
            if (issueTypes.isEmpty()) throw new RuntimeException("No JIRA issue types defined!");
            String firstIssueType =  ((GenericValue)issueTypes.iterator().next()).getString("id");
            log("ERROR: JIRA does not have a bug issue type with id " + BugzillaMappingBean.JIRA_BUG_ISSUE_TYPE_ID + "; using first found issue type " + firstIssueType+" instead.");
            return firstIssueType;
        }

    }


    /**
     * Associate the issue with a single version and component.  This is ok, as bugzilla only allows for a single
     * version and component for an issue.
     */
    private void createVersionComponentAssociations(MutableIssue issue, String project, String version, String component, String fixVersion)
    {
        Version verKey = getVersion(project + ":" + version);
        Version fixverKey = getVersion(project + ":" + fixVersion);
        if (verKey != null)
        {
            Version affectsVersion = versionManager.getVersion(verKey.getLong("id"));
            issue.setAffectedVersions(EasyList.build(affectsVersion));
        }
        else
        {
            if (log4jLog.isEnabledFor(Priority.ERROR))
                log4jLog.error("Could not find version '" + project + ":" + version + "' to associate with issue " + issue);
        }

        if (fixverKey != null)
        {
            Version fixVer = versionManager.getVersion(fixverKey.getLong("id"));
            issue.setFixVersions(EasyList.build(fixVer));
        }
        else
        {
            // Ignore. Bugzilla (2.1.18) sets target_milestone="---" for issues without a target milestone, and as '---' is a
            // nonexistent version, we get to here.
        }

        GenericValue comp = getComponent(project + ":" + component);
        if (comp != null)
        {
            GenericValue affectsComponent = projectManager.getComponent(comp.getLong("id"));
            issue.setComponents(EasyList.build(affectsComponent));
        }
        else
        {
            if (log4jLog.isEnabledFor(Priority.ERROR))
                log4jLog.error("Could not find component " + project + ":" + component + " to associate with issue " + issue);
        }
    }

    /**
     * Given an issue, update the underlying workflow, so that it matches the issues status.
     */
    private void setCurrentWorkflowStep(GenericValue issue) throws GenericEntityException
    {
        // retrieve the wfCurrentStep for this issue and change it
        Collection wfCurrentStepCollection = genericDelegator.findByAnd("OSCurrentStep", EasyMap.build("entryId", issue.getLong("workflowId")));
        GenericValue wfCurrentStep = (GenericValue) getOnly(wfCurrentStepCollection);
        wfCurrentStep.set("stepId", bugzillaMappingBean.getWorkflowStep(issue.getString("status")));
        wfCurrentStep.set("status", bugzillaMappingBean.getWorkflowStatus(issue.getString("status")));
        wfCurrentStep.store();
    }

    private void createCommentAndDescription(Connection conn, int bug_id, GenericValue issue) throws Exception
    {
        String description = null;
        commentPS.setInt(1, bug_id);

        ResultSet resultSet = commentPS.executeQuery();
        while (resultSet.next())
        {
            // the description entry for each bug is JIRA's description, the rest goes into comments.
            if (resultSet.isFirst())
            {
                description = resultSet.getString("thetext");
            }
            else
            {
                final User user = getUser(resultSet.getInt("who"));

                // check permissions first
                if (!permissionManager.hasPermission(Permissions.COMMENT_ISSUE, issue, user))
                {
                    log("You (" + user.getFullName() + ") do not have permission to comment on an issue in project: " + projectManager.getProject(issue.getLong("project")).getString("name"));
                }
                else
                {
                    ActionResult aResult = CoreFactory.getActionDispatcher().execute(ActionNames.COMMENT_CREATE, EasyMap.build("issue", issue, "remoteUser", user, "body", resultSet.getString("thetext"), "level", null, "timestamp", resultSet.getTimestamp("bug_when")));
                    ActionUtils.checkForErrors(aResult);
                }
            }
        }
        resultSet.close();

        issue.set("description", description);
        issue.store();
        cacheManager.flush(CacheManager.ISSUE_CACHE, issue); // Flush the cache, otherwise later when we look up the issue we'll get something stale. JRA-5542
    }

    // NOTE: this is untested code submitted by Vincent Fiano, we still need some test data to run through this
    private void createWorkHistory(Connection conn, int bug_id, GenericValue issue) throws Exception
    {
        PreparedStatement preparedStatement = conn.prepareStatement("SELECT * FROM bugs_activity WHERE bug_id = ? AND fieldid = 45 ORDER BY bug_when ASC");
        preparedStatement.setInt(1, bug_id);

        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next())
        {
            try
            {
                getUser(resultSet.getInt("who"));
                log("Adding work history for bug " + bug_id + ": " + new Float(resultSet.getFloat("added")) + " hours worked by " +
                        getUser(resultSet.getInt("who")) + " on " + resultSet.getTimestamp("bug_when"));

                ActionResult aResult = CoreFactory.getActionDispatcher().execute(ActionNames.WORKLOG_CREATE, EasyMap.build("issue", issue,
                        "remoteUser", getUser(resultSet.getInt("who")),
                        "body", "(see comment dated " + resultSet.getTimestamp("bug_when") + ")",
                        "timestamp", resultSet.getTimestamp("bug_when"),
                        "actionNum", new Long((long) (3600.0 * resultSet.getFloat("added")))));
                ActionUtils.checkForErrors(aResult);
            }
            catch (Exception e)
            {
                log(e.toString());
            }
        }
    }

    /**
     * Store the original bugzilla bug id in the change history.
     */
    private void createChangeHistory(int bug_id, GenericValue issue)
    {
        // create a change group and change item for each issue imported to record the original Bugzilla id.
        // change items used to make sure issues are not duplicated
        List changeItems = EasyList.build(new ChangeItemBean(ChangeItemBean.STATIC_FIELD, BUGZILLA_CHANGE_ITEM_FIELD, null, Integer.toString(bug_id), null, issue.getLong("id").toString()));
        ChangeLogUtils.createChangeGroup(importer, issue, issue, changeItems, true);
    }

    private void createVotes(Connection conn) throws SQLException
    {
        log("\n\nImporting Votes");

        int count = 0;

        PreparedStatement preparedStatement = conn.prepareStatement("SELECT who FROM votes where bug_id = ?");

        Iterator bugzillaBugIdIter = previouslyImportedKeys.keySet().iterator();

        // for each imported bug..
        while (bugzillaBugIdIter.hasNext())
        {
            Integer bugzillaBugId = (Integer) bugzillaBugIdIter.next();

            //            preparedStatement.setInt(1, bugzillaUserId.intValue());
            preparedStatement.setInt(1, bugzillaBugId.intValue());

            ResultSet rs = preparedStatement.executeQuery();

            // for each vote on an imported bug..
            while (rs.next())
            {
                try
                {
                    User voter = getUser(rs.getInt("who")); // find or create the voter
                    Long jiraBugId = (Long) previouslyImportedKeys.get(bugzillaBugId);
                    GenericValue issue = issueManager.getIssue(jiraBugId);
                    String resolution = issue.getString("resolution");
                    issue.setString("resolution", null); // hack to import votes on 'resolved' issues. JRA-6440
                    try {
                    if (!voteManager.addVote(voter, issue))
                    {
                        log("Failed to import vote on " + issue.getString("key"));
                    }
                    else
                        count++;
                    } finally
                    {
                        issue.setString("resolution", resolution);
                    }
                }
                catch (Throwable t)
                {
                    log("Failed to import vote for bugid=" + bugzillaBugId);
                    t.printStackTrace();
                }
            }
        }

        //        }
        closePS(preparedStatement);
        log(count + " votes imported from Bugzilla.");
    }

    /**
     * Return a map of bugzillaKey (Integer) -> Jira Issues Id (Integer).
     * <p/>
     * It does this by looking through the change items for the bugzilla import key.
     *
     * @throws GenericEntityException
     */
    protected Map retrieveImportedIssues() throws GenericEntityException
    {
        Map previousKeys = new HashMap();

        // get the issues previously imported from Bugzilla via the change items.
        Collection changeItems = genericDelegator.findByAnd("ChangeItem", EasyMap.build("field", BUGZILLA_CHANGE_ITEM_FIELD));
        for (Iterator iterator = changeItems.iterator(); iterator.hasNext();)
        {
            GenericValue changeItem = (GenericValue) iterator.next();
            previousKeys.put(new Integer(changeItem.getString("oldstring")), new Long(changeItem.getString("newstring")));
        }
        return previousKeys;
    }

    private void createComponents(Connection conn) throws SQLException
    {
        int count = 0;
        log("\n\nImporting Components from project(s) " + this.selectedProjects + "\n");

        PreparedStatement preparedStatement = conn.prepareStatement("SELECT * FROM components where " + whereSelectedProjectClauseForVersionsAndComponents());
        ResultSet resultSet = preparedStatement.executeQuery();
        String component;
        while (resultSet.next())
        {
            component = resultSet.getString((oldBugzilla ? "value" : "name"));
            log("Importing Component: " + component);

            boolean created = createComponent(getProductName(resultSet, false), component, resultSet.getString("description"));
            if (created)
                count++;
        }
        log(count + " components imported from Bugzilla.");
        closePS(preparedStatement);
    }

    /**
     * Handles the different database schemata to retrieve the product name.
     * The program and product columns have been replaced with a FK pointing to
     * the name in the products table in 2.17.
     * <p/>
     * In 2.16, the product name for BUGS are listed in the product column
     * For COMPONENTS and VERSIONS, they are listed in the program column
     *
     * @param resultSet
     * @throws SQLException
     */
    private String getProductName(ResultSet resultSet, boolean isBugzillaBug) throws SQLException
    {
        String projectName;
        try
        {
            // 2.17+ format
            int pid = resultSet.getInt("product_id");
            if (pid == 0) throw new RuntimeException("Null product_id for "+resultSet);
            productPS.setInt(1, pid);
            ResultSet rs = productPS.executeQuery();
            boolean hasNext = rs.next();
            if (!hasNext) throw new RuntimeException("No product with ID "+pid);
            projectName = rs.getString("name");
            rs.close();
        }
        catch (SQLException e)
        {
            // If we don't have a product_id, we may be using Bugzilla 2.16 or earlier. In this case, the resultSet
            // may be for the components or bugs tables:
            if (isBugzillaBug)
            {
                projectName = resultSet.getString("product");
            }
            else
            {
                projectName = resultSet.getString("program");
            }
        }
        return projectName;
    }

    private boolean createComponent(String projectName, String componentName, String description)
    {
        GenericValue project = getProject(projectName);
        GenericValue existingComponent = projectManager.getComponent(project, componentName);

        // if the componentName exists already, do not import
        if (existingComponent != null)
        {
            log("Component " + componentName + " in Project: " + projectName + " already exists. Not imported");
            componentKeys.put(projectName + ":" + componentName, existingComponent);
            return false;
        }
        else
        {
            try
            {
                GenericValue componentGV = projectComponentManager.createComponent(componentName, project, null, description);

                // imported components are stored for use later
                componentKeys.put(projectName + ":" + componentName, componentGV);
                return true;
            }
            catch (Exception e)
            {
                log("Error importing Component: " + componentName);
                log(ExceptionUtils.getStackTrace(e));
                return false;
            }
        }
    }

    private void createVersions(Connection conn) throws SQLException
    {
        log("\n\nImporting Versions from project " + this.selectedProjects + "\n");

        createVersionFromVersionTable(conn);
        createVersionFromBugsTable(conn);
    }

    private void createVersionFromVersionTable(Connection conn)
            throws SQLException
    {
        int count = 0;

        String sql = "select * from versions where " + whereSelectedProjectClauseForVersionsAndComponents();
        PreparedStatement preparedStatement = conn.prepareStatement(sql);
        ResultSet resultSet = preparedStatement.executeQuery();

        while (resultSet.next())
        {
            String versionName = resultSet.getString("value");
            log("Importing Version: " + versionName);

            boolean created = createVersion(getProductName(resultSet, false), versionName);
            if (created)
                count++;
        }
        closePS(preparedStatement);
        log(count + " versions imported from Bugzilla from the versions table.");
    }

    private void createVersionFromBugsTable(Connection conn)
            throws SQLException
    {
        int count = 0;

        String sql;
        if (oldBugzilla)
        {
            sql = "select product, target_milestone from bugs where product in (" + this.selectedProjects + ") group by product, target_milestone";
        }
        else
        {
            sql = "select product_id, target_milestone from bugs where " + whereSelectedProjectClauseForVersionsAndComponents() + " group by product_id, target_milestone";
        }
        PreparedStatement preparedStatement = conn.prepareStatement(sql);
        ResultSet resultSet = preparedStatement.executeQuery();

        while (resultSet.next())
        {
            String versionName = resultSet.getString("target_milestone");
            if (!"---".equals(versionName))
            {
                log("Importing Version: " + versionName);

                String productName = getProductName(resultSet, true);
                boolean created = createVersion(productName, versionName);
                if (created)
                {
                    count++;
                }
            }
        }
        log(count + " versions imported from Bugzilla from the bugs table.");
        closePS(preparedStatement);
    }

    /**
     * Creates a clause for the where part of a query on Versions or Components
     * that restricts results to the correct projects. JRA-8555 seems to be due
     * to the crazy fact that old bugzilla versions use "program" in the
     * VERSIONS and COMPONENTS tables and "product" in the BUGS table.
     * @return the clause suitable for putting after the where.
     */
    private String whereSelectedProjectClauseForVersionsAndComponents()
    {
        if (oldBugzilla)
        {
            return " program in (" + this.selectedProjects + ") ";
        }
        else
        {
            return " product_id in (" + commaSeparate(projectToBugzillaIdMap.values()) + ") ";
        }

    }

    /**
     * Returns comma-separated text values of a list of objects.
     */
    public String commaSeparate(Collection coll)
    {
        if (coll.size() == 0)
        {
            return "";
        }
        StringBuffer buf = new StringBuffer();
        for (Iterator it = coll.iterator(); it.hasNext();)
        {
            Object o = it.next();
            buf.append(o);
            if (it.hasNext()) buf.append(",");
        }
        return buf.toString();
    }

    private boolean createVersion(String project, String versionName)
    {
        Version existingVersion = versionManager.getVersion(getProject(project), versionName);
        if (existingVersion != null)
        {
            log("Version: " + versionName + " in Project: " + project + " already exists. Not imported");
            versionKeys.put(project + ":" + versionName, existingVersion);
            return false;
        }
        else
        {
            Version version;
            try
            {
                version = versionManager.createVersion(versionName, null, null, getProject(project), null);
                versionKeys.put(project + ":" + versionName, version);
                return true;
            }
            catch (Exception e)
            {
                log("Error importing Version: " + versionName);
                log(ExceptionUtils.getStackTrace(e));
                return false;
            }
        }
    }

    private void createProjects(Connection conn) throws SQLException
    {
        int count = 0;
        log("\n\nImporting project(s) " + this.selectedProjects);

        PreparedStatement preparedStatement;
        ResultSet resultSet;


        final String productColName = (oldBugzilla ? "product" : "name");
        preparedStatement = conn.prepareStatement("Select * from products where " + productColName + " in (" + this.selectedProjects + ")");
        resultSet = preparedStatement.executeQuery();
        while (resultSet.next())
        {
            String product = resultSet.getString(productColName);
            if (!oldBugzilla) projectToBugzillaIdMap.put(product, new Integer(resultSet.getInt("id")));

            log("Importing Project: " + product);

            String description = resultSet.getString("description");
            boolean created = createProject(product, description);

            if (created)
                count++;
        }
        log(count + " projects imported from Bugzilla.");
        closePS(preparedStatement);
    }


    private boolean createProject(String product, String description)
    {
        GenericValue existingProject = projectManager.getProjectByName(product);
        if (existingProject != null)
        {
            log("Project: " + product + " already exists. Not imported");
            projectKeys.put(product, existingProject);
            return false;
        }
        else
        {
            GenericValue project;
            try
            {
                project = ProjectUtils.createProject(EasyMap.build("key", bugzillaMappingBean.getProjectKey(product), "lead", bugzillaMappingBean.getProjectLead(product), "name", product, "description", description));

                //Add the default permission scheme for this project
                permissionSchemeManager.addDefaultSchemeToProject(project);
                // Add the default issue type screen scheme for this project
                issueTypeScreenSchemeManager.associateWithDefaultScheme(project);
                projectKeys.put(product, project);
                return true;
            }
            catch (Exception e)
            {
                log("Error importing Project: " + product);
                log(ExceptionUtils.getStackTrace(e));
                return false;
            }
        }
    }

    private void createUser(int bugzillaId) throws SQLException
    {
        profilePS.setInt(1, bugzillaId);
        ResultSet resultSet = profilePS.executeQuery();

        int count = createUserFrom(resultSet);
        if (count == 0)
            throw new RuntimeException("Could not create bugzilla user " + bugzillaId + ", referenced in the bugzilla database.");
        resultSet.close();
    }

    private int createUserFrom(ResultSet resultSet) throws SQLException
    {
        int count = 0;
        String loginNameEmail;
        String fullname;
        String password;
        while (resultSet.next())
        {
            // user name is bugzilla's email/login and changed into lower case
            loginNameEmail = getUsernameFromBugzillaProfile(resultSet);
            fullname = TextUtils.noNull(resultSet.getString("realname")).trim();

            int userid = resultSet.getInt("userid");

            password = null;

            boolean created;
            if (cryptedPasswords)
            {
                //Newer versions of Bugzilla don't use the password field, but instead use
                //a hash.  We will ignore the passwords in this case
                created = createUser(loginNameEmail, fullname, userid, null);

            }
            else
            {
                password = TextUtils.noNull(resultSet.getString("password")).trim();
                created = createUser(loginNameEmail, fullname, userid, password);
            }
            if (created)
                count++;
        }
        return count;
    }

    /**
     * Given a Bugzilla 'profile' user record, infer a JIRA username from it.
     * In Bugzilla your username is your email address, and this will become your JIRA username, unless this method
     * is overridden to implement a different scheme.
     */
    protected String getUsernameFromBugzillaProfile(ResultSet bugzillaProfileResultSet)
            throws SQLException
    {
        return TextUtils.noNull(bugzillaProfileResultSet.getString("login_name")).toLowerCase().trim();

        // Alternatively, use the first part ('joe' in 'joe@company.com')
//        String name = bugzillaProfileResultSet.getString("login_name");
//        name = TextUtils.noNull(name).trim();
//        int i = name.indexOf("@");
//        if (i != -1) name = name.substring(0, i);
//        return name;
    }

    private boolean createUser(final String loginNameEmail, String fullname, int bugzillaUserId, final String password)
    {
        log("Importing User: " + loginNameEmail);
        if (!TextUtils.stringSet(fullname))
            fullname = getFullNameFromEmail(loginNameEmail);
        try
        {
            User user = UserUtils.getUser(loginNameEmail);
            if (user != null)
            {
                log("\tUser: " + loginNameEmail + " already exists. Not imported");
                userKeys.put(new Integer(bugzillaUserId), user);
                return reuseExistingUsers;
            }
        }
        catch (EntityNotFoundException e)
        {
            try
            {
                // Bugzilla uses the email address as user id, whereas JIRA has a distinct string for this.
                // Here we check if the email address is currently owned by a user, to prevent a new user being
                // created if a logically identical one exists
                if (reuseExistingUsers)
                {
                    try
                    {
                        User existingUser = UserUtils.getUserByEmail(loginNameEmail);
                        if (existingUser != null)
                        {
                            log("User with email '" + loginNameEmail + "' already exists (" + existingUser.getName() + "). Not imported");
                            userKeys.put(new Integer(bugzillaUserId), existingUser);
                            return reuseExistingUsers;
                        }
                    }
                    catch (EntityNotFoundException ignored)
                    {
                    }
                }

                User user = JiraUserUtils.createJiraUser(loginNameEmail, password, loginNameEmail, fullname);
                userKeys.put(new Integer(bugzillaUserId), user);
                return true;
            }
            catch (Exception exception)
            {
                log("User: " + loginNameEmail + " not imported. An error occurred. " + exception.getMessage());
                return false;
            }
        }
        return false;
    }

    private void createAttachments(Connection conn, PreparedStatement attachPrepStatement, int bug_id, GenericValue issue) throws Exception
    {
        ResultSet resultSet = null;
        try
        {
            attachPrepStatement.clearParameters();
            attachPrepStatement.setInt(1, bug_id);
            resultSet = attachPrepStatement.executeQuery();
            while (resultSet.next())
            {
                String fileName = resultSet.getString("filename");
                if (fileName.lastIndexOf('\\') > -1)
                {
                    fileName = fileName.substring(fileName.lastIndexOf('\\') + 1);
                }

                if (fileName.lastIndexOf('/') > -1)
                {
                    fileName = fileName.substring(fileName.lastIndexOf('/') + 1);
                }

                final Blob fileData = resultSet.getBlob("thedata");

                int submitterId = resultSet.getInt("submitter_id");

                Attachment attachment = attachmentManager.createAttachment(issue, getUser(submitterId), resultSet.getString("mimetype"), fileName, new Long(fileData.length()), null, UtilDateTime.nowTimestamp());
                //we need to set the created date back to when it was created in the original system.
                attachment.getGenericValue().set("created", resultSet.getTimestamp("creation_ts"));
                attachment.store();

                issue.set("updated", UtilDateTime.nowTimestamp());
                CoreFactory.getGenericDelegator().storeAll(EasyList.build(issue));
                cacheManager.flush(CacheManager.ISSUE_CACHE, issue);

                File realAttachFile = AttachmentUtils.getAttachmentFile(attachment);
                BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(realAttachFile));
                FileUtils.copy(new BufferedInputStream(fileData.getBinaryStream()), out);
                out.close();
            }
        }
        catch (SQLException e)
        {
            log("Error on importing attachments for bug " + bug_id + ". Error:" + e.getMessage());
        }
        finally
        {
            if (resultSet != null) //prevent nullpointer - JRA-6154
                resultSet.close();
        }
    }

    private void createLinks(PreparedStatement linkBlocksPrepStatement, PreparedStatement linkDependsOnPrepStatement, int bug_id, GenericValue issue) throws SQLException
    {
        Long issueId = issue.getLong("id");
        ResultSet resultSet = null;
        try
        {
            linkBlocksPrepStatement.clearParameters();
            linkBlocksPrepStatement.setInt(1, bug_id);
            resultSet = linkBlocksPrepStatement.executeQuery();
            while (resultSet.next())
            {
                String blocked = resultSet.getString("blocked");
                Long linkedIssueId = (Long) previouslyImportedKeys.get(new Integer(blocked));
                if (linkedIssueId != null)
                {
                    try
                    {
                        GenericValue linkedIssue = issueManager.getIssue(linkedIssueId);
                        if (linkedIssue == null)
                        {
                            log4jLog.error("Could not find issue with id " + linkedIssueId + " although it was once imported from bug #" + blocked);
                            continue;
                        }
                        issueLinkManager.createIssueLink(issueId, linkedIssueId, dependencyLinkType.getId(), null, null);
                        log("Creating link: issue "+issue.getString("key")+" depends on "+linkedIssue.getString("key"));
                    } catch (CreateException e)
                    {
                        log4jLog.error(e, e);
                    }
                }
            }
            resultSet.close();

            linkDependsOnPrepStatement.clearParameters();
            linkDependsOnPrepStatement.setInt(1, bug_id);
            resultSet = linkDependsOnPrepStatement.executeQuery();
            while (resultSet.next())
            {
                String dependsOn = resultSet.getString("dependson");
                Long linkedIssueId = (Long) previouslyImportedKeys.get(new Integer(dependsOn));
                if (linkedIssueId != null)
                {
                    try
                    {
                        GenericValue linkedIssue = issueManager.getIssue(linkedIssueId);
                        if (linkedIssue == null)
                        {
                            log4jLog.error("Could not find issue with id " + linkedIssueId + " although it was once imported from bug #" + dependsOn);
                            continue;
                        }
                        issueLinkManager.createIssueLink(issueId, linkedIssueId, dependencyLinkType.getId(), null, null);
                        log("Creating link: issue "+issue.getString("key")+" blocks "+linkedIssue.getString("key"));

                    } catch (CreateException e)
                    {
                        log4jLog.error(e, e);
                    }
                }
            };
        }
        catch (SQLException e)
        {
            log("Error creating dependency link for bug " + bug_id + ". Error:" + e.getMessage());
        }
        finally
        {
            if (resultSet != null) //prevent nullpointer - JRA-6154
                resultSet.close();
        }

    }


    /**
     * Goes through imported issues and rewrites inline links (eg. 'bug #12345') to JIRA inline
     * links (JRA-XXXX).
     */
    private void rewriteBugLinks() throws GenericEntityException
    {
        log("Rewriting bug links for "+importedKeys.size()+" issues.");

        Iterator importedIssueIds = importedKeys.values().iterator();
        while (importedIssueIds.hasNext())
        {
            Long issueId = (Long) importedIssueIds.next();
            GenericValue issue = issueManager.getIssue(issueId);
            if (issue != null)
            {
                String key = issue.getString("key");
                final String oldDescription = issue.getString("description");
                if ( oldDescription != null && oldDescription.length() > 0 )
                {
                    final String newDescription = rewriteBugLinkInText(oldDescription, key);
                    if (!oldDescription.equals(newDescription))
                    {
                        issue.setString("description", newDescription);
                        issue.store();
                    }
                }

                Collection comments = CoreFactory.getGenericDelegator().findByAnd("Action", EasyMap.build("type", "comment", "issue", issueId));
                Iterator commentIter = comments.iterator();
                while (commentIter.hasNext())
                {
                    GenericValue comment = (GenericValue) commentIter.next();
                    final String oldComment = comment.getString("body");
                    if ( oldComment != null && oldComment.length() > 0 ) {
                        final String newComment = rewriteBugLinkInText(oldComment, key);
                        if (!oldComment.equals(newComment))
                        {
                            comment.setString("body", newComment);
                            comment.store();
                        }
                    }
                }
            }
        }
        cacheManager.flush(CacheManager.ISSUE_CACHE);
    }

    /**
     * Rewrite inline bug links ('bug #1234' etc) in a string.
     * @param str The text to rewrite
     * @param parentIssueKey Issue this text came from (purely for logging).
     * @return str, with links rewritten.
     */
    public String rewriteBugLinkInText(final String str, final String parentIssueKey)
    {
        Pattern pattern = null;
        try
        {
            pattern = new Perl5Compiler().compile("[bB]ug #?(\\d+)");
        }
        catch (MalformedPatternException e)
        {
            log4jLog.error("Error parsing bug# regexp", e);
            return str;
        }
        String result = Util.substitute(new Perl5Matcher(), pattern, new Substitution() {
            public void appendSubstitution(StringBuffer appendBuffer, MatchResult match,
                           int substitutionCount,
                           PatternMatcherInput originalInput,
                           PatternMatcher matcher, Pattern pattern)
            {
                String bugId = match.group(1);
                Long jiraIssueId = (Long) importedKeys.get(
                        new Integer(bugId
                        ));
                if (jiraIssueId == null)
                {
                    log("No imported issue found for bug reference "+bugId +" in "+parentIssueKey);
                    appendBuffer.append(originalInput);
                }
                else
                {
                    GenericValue issue = issueManager.getIssue(jiraIssueId);
                    log("In "+parentIssueKey+": Rewriting '"+match.group(0)+"' to '"+issue.getString("key")+"'");
                    appendBuffer.append(issue.getString("key"));
                }
            }

        }, str, Util.SUBSTITUTE_ALL);
        return result;
    }

    /**
     * Return an integer prefix of a string, if any.
     */
    public Integer getIdFromStartOfString(String s)
    {
        if (s.length() == 0 || !Character.isDigit(s.charAt(0)))
            return null;

        StringBuffer buf = new StringBuffer(5);
        for (int i = 0; i < Math.min(6, s.length()); i++)
        {
            char c = s.charAt(i);
            if (Character.isDigit(c))
            {
                buf.append(c);
            }
            else if (Character.isLetter(c))
            {
                return null;
            }
            else
                break;
        }
        return new Integer(Integer.parseInt(buf.toString()));
    }


    private GenericValue getProject(String project)
    {
        return (GenericValue) projectKeys.get(project);
    }

    private Version getVersion(String value)
    {
        return (Version) versionKeys.get(value);
    }

    private GenericValue getComponent(String value)
    {
        return (GenericValue) componentKeys.get(value);
    }

    private User getUser(final int bugzillaUserId) throws SQLException
    {
        final Integer idInt = new Integer(bugzillaUserId);
        User user = (User) userKeys.get(idInt);
        if (user == null)
        {
            createUser(bugzillaUserId);
            user = (User) userKeys.get(idInt);
        }
        return user;
    }

    private String getProjectKey(String name, int keylength) throws GenericEntityException
    {
        String potentialKey;
        if (name.length() < keylength)
            potentialKey = name + generatePaddingString(keylength - name.length());
        else
            potentialKey = name.substring(0, keylength);

        if (projectManager.getProjectByKey(potentialKey) != null)
        {
            return getProjectKey(name, ++keylength);
        }
        else
        {
            return potentialKey;
        }
    }

    public String getProjectKey(String name) throws GenericEntityException
    {
        return getProjectKey(name.toUpperCase(), 3); //minimum key length of 3
    }

    private String generatePaddingString(int length)
    {
        char[] padarray = new char[length];
        for (int i = 0; i < length; i++)
        {
            padarray[i] = 'J';
        }
        return String.valueOf(padarray);
    }

    public String getFullNameFromEmail(final String email)
    {
        if (email == null)
            return "";

        int index = email.indexOf("@");
        if (index != -1)
            return email.substring(0, index);
        else
            return "";
    }

    private void log(String s)
    {
        importLog.append("[" + sdf.format(new Date()) + "] ");
        importLog.append(s);
        importLog.append("\n");
        log4jLog.info(s);
    }

    private void log(String s, Exception e)
    {
        log(s + ": " + ExceptionUtils.getStackTrace(e));
    }

    private static void closePS(PreparedStatement ps)
    {
        try
        {
            ps.close();
        }
        catch (SQLException e)
        {
            log4jLog.error("Error closing PreparedStatement in Bugzilla Import", e);
        }
    }

    private static Object getOnly(Collection singleCol)
    {
        if (singleCol == null)
            return null;
        else if (singleCol.size() > 1)
            throw new IllegalArgumentException("Passes Collection with more than one element");
        else if (singleCol.isEmpty())
            throw new IllegalArgumentException("Passed Collection with no elements");
        else
            return singleCol.iterator().next();
    }

    /**
     * By examining the schema, determines if we're importing from <=2.16 or 2.17+
     */
    public static boolean isOldBugzilla(Connection conn) throws SQLException
    {
        ResultSet rs = conn.getMetaData().getColumns(null, "%", "products", "product");
        if (rs.next()) return true; // Bugzilla 2.16 (and probably earlier)
        rs = conn.getMetaData().getColumns(null, "%", "products", "name");
        if (rs.next()) return false; // Bugzilla 2.17 ('product' was split into 'id' and 'name')
        throw new RuntimeException("Could not find 'product' or 'name' column for Bugzilla database table 'products'." +
                "Unknown Bugzilla version.  Please mail Atlassian support with details of your database.");
    }

    public String getImportLog()
    {
        return importLog.toString();
    }

    public static List getAllBugzillaProjects(BugzillaConnectionBean connectionBean) throws java.sql.SQLException
    {
        try
        {
            PreparedStatement preparedStatement = connectionBean.getConnection().prepareStatement("Select * from products");
            ResultSet resultSet = preparedStatement.executeQuery();
            List projects = new ArrayList();
            while (resultSet.next())
            {
                String product = resultSet.getString(isOldBugzilla(connectionBean.getConnection()) ? "product" : "name");
                projects.add(product);
            }
            return projects;
        }
        finally
        {
            connectionBean.closeConnection();
        }
    }

    private void createOrFindCustomFields() throws GenericEntityException
    {
        CustomFieldType numericFieldCFType = customFieldManager.getCustomFieldType(CreateCustomField.FIELD_TYPE_PREFIX + BUGZILLA_ID_TYPE);
        CustomFieldSearcher numericSearcher = customFieldManager.getCustomFieldSearcher(CreateCustomField.FIELD_TYPE_PREFIX + BUGZILLA_ID_SEARCHER);

        if (numericFieldCFType != null)
        {
            bugzillaIdCustomField = customFieldManager.getCustomFieldObjectByName(BUGZILLA_ID_CF_NAME);
            if (bugzillaIdCustomField == null)
            {
                bugzillaIdCustomField = customFieldManager.createCustomField(BUGZILLA_ID_CF_NAME,
                        BUGZILLA_ID_CF_NAME,
                        numericFieldCFType,
                        numericSearcher, EasyList.build(GlobalIssueContext.getInstance()), EasyList.buildNull());
                externalUtils.associateCustomFieldWithScreen(bugzillaIdCustomField, null);
            }
        }
        else
        {
            log("WARNING: FieldType '" + BUGZILLA_ID_TYPE + "' is required for Bugzilla Ids but has not been configured. ID fields will not be created");
        }

    }

    private void createOrFindDependencies()
    {
        Collection dependency = issueLinkTypeManager.getIssueLinkTypesByName("Dependency");
        if (dependency.size() == 0)
        {
            issueLinkTypeManager.createIssueLinkType("Dependency", "depends on", "blocks", null);
            dependency = issueLinkTypeManager.getIssueLinkTypesByName("Dependency");
        }
        dependencyLinkType = (IssueLinkType) dependency.iterator().next();
    }


    private static interface BugzillaMappingBean
    {
        /** The JIRA issue type to use for Bugzilla bugs that are 'enhancements'. */
        String JIRA_ENHANCEMENT_ISSUE_TYPE_ID = "4";
        /** The JIRA issue type to use for normal Bugzilla bugs. */
        String JIRA_BUG_ISSUE_TYPE_ID = "1";

        public String getProjectKey(String project);

        public String getPriority(String originalPriority);

        public String getResolution(String originalResolution);

        public String getStatus(String originalStatus);

        public Integer getWorkflowStep(String originalWorkflowStep);

        public String getWorkflowStatus(String originalWorkflowStatus);

        public String getProjectLead(String project);
    }

    public static abstract class DefaultBugzillaMappingBean implements BugzillaMappingBean
    {
        private static Map priorityMap = new HashMap();
        private static Map resolutionMap = new HashMap();
        private static Map statusMap = new HashMap();
        private static Map wfStepMap = new HashMap();
        private static Map wfStatusMap = new HashMap();

        static
        {
            // bugzilla's priorities mapping to JIRA priorities
            priorityMap.put("blocker", "" + IssueFieldConstants.BLOCKER_PRIORITY_ID);
            priorityMap.put("critical", "" + IssueFieldConstants.CRITICAL_PRIORITY_ID);
            priorityMap.put("major", "" + IssueFieldConstants.MAJOR_PRIORITY_ID);
            priorityMap.put("normal", "" + IssueFieldConstants.MAJOR_PRIORITY_ID);
            priorityMap.put("enhancement", "" + IssueFieldConstants.MINOR_PRIORITY_ID);
            priorityMap.put("minor", "" + IssueFieldConstants.MINOR_PRIORITY_ID);
            priorityMap.put("trivial", "" + IssueFieldConstants.TRIVIAL_PRIORITY_ID);

            // bugzilla resolutions mapping to JIRA resolutions
            resolutionMap.put("", null);
            resolutionMap.put("FIXED", "" + IssueFieldConstants.FIXED_RESOLUTION_ID);
            resolutionMap.put("INVALID", "" + IssueFieldConstants.INCOMPLETE_RESOLUTION_ID);
            resolutionMap.put("WONTFIX", "" + IssueFieldConstants.WONTFIX_RESOLUTION_ID);
            resolutionMap.put("LATER", "" + IssueFieldConstants.WONTFIX_RESOLUTION_ID);
            resolutionMap.put("REMIND", "" + IssueFieldConstants.WONTFIX_RESOLUTION_ID);
            resolutionMap.put("DUPLICATE", "" + IssueFieldConstants.DUPLICATE_RESOLUTION_ID);
            resolutionMap.put("WORKSFORME", "" + IssueFieldConstants.CANNOTREPRODUCE_RESOLUTION_ID);
            resolutionMap.put("NEEDTESTCASE", "" + IssueFieldConstants.INCOMPLETE_RESOLUTION_ID);

            // bugzilla status mapping to JIRA status
            statusMap.put("UNCONFIRMED", "" + IssueFieldConstants.OPEN_STATUS_ID);
            statusMap.put("NEW", "" + IssueFieldConstants.OPEN_STATUS_ID);
            statusMap.put("ASSIGNED", "" + IssueFieldConstants.OPEN_STATUS_ID);
            statusMap.put("REOPENED", "" + IssueFieldConstants.REOPENED_STATUS_ID);
            statusMap.put("RESOLVED", "" + IssueFieldConstants.RESOLVED_STATUS_ID);
            statusMap.put("VERIFIED", "" + IssueFieldConstants.RESOLVED_STATUS_ID);
            statusMap.put("CLOSED", "" + IssueFieldConstants.CLOSED_STATUS_ID);

            // workflow Mappings
            wfStepMap.put("1", new Integer("1"));
            wfStepMap.put("2", new Integer("2"));
            wfStepMap.put("3", new Integer("3"));
            wfStepMap.put("4", new Integer("5"));
            wfStepMap.put("5", new Integer("4"));
            wfStepMap.put("6", new Integer("6"));

            wfStatusMap.put("1", "Open");
            wfStatusMap.put("3", "In Progress");
            wfStatusMap.put("4", "Reopened");
            wfStatusMap.put("5", "Resolved");
            wfStatusMap.put("6", "Closed");
        }

        public String getPriority(String originalPriority)
        {
            return (String) priorityMap.get(originalPriority);
        }

        public String getResolution(String originalResolution)
        {
            return (String) resolutionMap.get(originalResolution);
        }

        public String getStatus(String originalStatus)
        {
            return (String) statusMap.get(originalStatus);
        }

        public Integer getWorkflowStep(String originalWorkflowStep)
        {
            return (Integer) wfStepMap.get(originalWorkflowStep);
        }

        public String getWorkflowStatus(String originalWorkflowStatus)
        {
            return (String) wfStatusMap.get(originalWorkflowStatus);
        }

        public abstract String getProjectKey(String project);
    }

    private boolean tableHasColumn(Connection conn, String table, String column) throws SQLException
    {
        ResultSet rs = conn.getMetaData().getColumns(null, null, table, column);
        boolean next = rs.next();
        rs.close();
        return next;
    }
}
