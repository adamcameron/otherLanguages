<cfscript>
param URL.ident="unknown";
pauseFor = 1000 + (randRange(0, 20) * 100);
sleep(pauseFor);
writeOutput("Response after #pauseFor#ms from request with ident [#URL.ident#]");
</cfscript>