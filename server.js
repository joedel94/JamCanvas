var connect = require('connect');
var serveStatic = require('serve-static');
var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();

app.use(fileUpload());

app.post('/upload', function(req, res) {
	var sampleFile;

	if (!req.files){
		res.send('No files were uploaded.');
		return;
	}

	sampleFile = res.files.sampleFile;

	sampleFile.mv('/temp/test.mp3', function(err){
		if (err){
			res.status(500).send(err);
		}else{
			res.send('File uploaded!');
		}
	});
});

connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080...');
});