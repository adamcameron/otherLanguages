// filePipeExercise.js

var fs = require('fs');
var file = fs.createReadStream('readme.md');
 
file.pipe(process.stdout);