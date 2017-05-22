var connect = require('connect');
var serveStatic = require('serve-static');
var http = require('http');
var fs = require('fs');




var azure;
if (fs.existsSync('absolute path to azure-storage.js')) {
  azure = require('absolute path to azure-storage');
} else {
  azure = require('azure-storage');
}

var async = require('async');

var blobService = azure.createBlobService('jamcanvas1727', 'CpklHsCHIvpt/tyx1b/5YwumPefra8yN5QMRq0r7kSUKONh/nTOXgHbibTzx5oiH29FPeNe9Cxowp+r82v+Ihw=='
, 'http://jamcanvas1727.blob.core.windows.net');

  // NOTE: does not handle pagination.
  blobService.listBlobsSegmented("demouser", null, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      var blobs = result.entries;
      var blobsDownloaded = 0;

      blobs.forEach(function (blob) {
          blobService.getBlobToLocalFile("demouser", blob.name, './uploads/' + blob.name, function (error2) {
          blobsDownloaded++;
          var selectedSong = blob.name;

          if (error2) {
            console.log(error2);
          } else {
            console.log(' Blob ' + blob.name + ' download finished.');

            if (blobsDownloaded === blobs.length) {
              // Wait until all workers complete and the blobs are downloaded
              console.log('All files downloaded');
            }
          }
        });
      });
    }
  });
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080...');
});