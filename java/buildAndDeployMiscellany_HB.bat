del miscellany.jar
javac me\adamcameron\miscellany\*.java
jar -cf miscellany.jar me\adamcameron\miscellany\*.class
copy miscellany.jar C:\apps\adobe\coldfusion\2016\express\cfusion\wwwroot\WEB-INF\lib
copy miscellany.jar C:\apps\adobe\coldfusion\2016\full\cfusion\wwwroot\WEB-INF\lib
copy miscellany.jar C:\apps\adobe\coldfusion\11\express\cfusion\wwwroot\WEB-INF\lib
copy miscellany.jar C:\apps\lucee\5\webapps\ROOT\WEB-INF\lucee\lib

pause
