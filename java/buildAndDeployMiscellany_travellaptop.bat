javac -Xlint:none me\adamcameron\miscellany\*.java
jar -cf miscellany.jar me\adamcameron\miscellany\*.class
copy miscellany.jar C:\apps\adobe\ColdFusion\11\express\cfusion\wwwroot\WEB-INF\lib
copy miscellany.jar C:\apps\adobe\ColdFusion\12\express\cfusion\wwwroot\WEB-INF\lib
copy miscellany.jar C:\apps\lucee\4.5\express\webapps\ROOT\WEB-INF\lucee\lib
copy miscellany.jar C:\apps\lucee\5.0\express\webapps\ROOT\WEB-INF\lucee\lib
