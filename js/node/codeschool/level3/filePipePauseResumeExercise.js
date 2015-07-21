// filePipeExercise.js

var fs = require('fs');

var file = fs.createReadStream("icon.png");
var newFile = fs.createWriteStream("icon-new.png");

file.on('data', function(chunk) {
	var bufferGood = newFile.write(chunk);
	if (!bufferGood){
		file.pause();
	}
});

file.on('end', function() {
	newFile.end();
});

newFile.on("drain", function(){
	file.resume();
});