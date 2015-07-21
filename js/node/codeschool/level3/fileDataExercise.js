// fileDataExercise.js

var fs = require('fs');
var file = fs.createReadStream('readme.md');
 
file.on('data', function(chunk) {
	process.stdout.write(chunk.toString());
});
