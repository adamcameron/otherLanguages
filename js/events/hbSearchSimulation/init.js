$(document).ready(function(){
	var telemetry = new HB.Telemetry("#telemetryLog");

	var listing = new HB.Listing("#listing", {telemetry:telemetry});

	var pagination = new HB.Pagination(
		{pagination:"#paginationControls", pageSize:"#pageSizeControls"},
		{
			telemetry:telemetry,
			listing:listing
		}
	);
	var remoteProxy = new HB.RemoteProxy("#remoteProxy", {
		telemetry:telemetry,
		pagination:pagination
	});

	var page = new HB.Page("#page", {
		telemetry:telemetry,
		pagination:pagination,
		remoteProxy:remoteProxy
	});
	pagination.setListener("page", page);

	var sortControls = new HB.Sorter("#sortControls", {
		pagination:pagination,
		telemetry:telemetry
	});
	var filterControls = new HB.Filters("#filterControls", {
		pagination:pagination,
		telemetry:telemetry
	});


	$("#clearTelemetry").on("click", function(){
		$("#telemetryLog").html("");
	});

});