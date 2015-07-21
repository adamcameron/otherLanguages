// filePipeEndExercise.js

var fs = require('fs');
var file = fs.createReadStream('readme.md');

file.pipe(process.stdout, { end: false });

file.on("end", function() {
  console.log('--File Complete--');
});