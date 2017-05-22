/*var azure = require('azure-storage');
//var fs = require('fs');

var blobService = azure.createBlobService();

//will need some way to pass the container name into 
blobService.createContainerIfNotExists('containerName', {publicAccessLevel : 'container'}, function(error, result, response){
	if(!error){
		//Do something
	}
});

//same as above, with addition of the blob name and file path
//can use file stream if unable to directly access client files
blobService.createBlockBlobFromLocalFile('containerName', 'blobName', 'filePath', function(error, result, response){
	if(!error){
		//Do something
	}
});

//result.entries contains any blob names found
blobService.listBlobsSegmented('containerName', null, function(error, result, response){
	if(!error){
		//Do something
	}
});

//will grab a blob content and store it locally
blobService.getBlobToStream('containerName', 'blobName', fs.createWriteStream('outputPath'), function(error, result, response){
	if(!error){
		//Do something
	}
});

blobService.deleteContainerIfExists('containerName', function(error, result, response){
	if(!error){
		//Do something
	}
});*/