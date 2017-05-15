console.log("selectPage");

function selectUploadOption(option) {
	$(".begin-projection").removeClass("disabled");
	$(".upload-option").not(option).addClass("disabled");
}

function selectDemo(element) {
	demoSong = $("#demo").val();
	if (demoSong) {
		selectUploadOption($(element).parent());
	}	
}

/*FileUp needs to:
  1. Get the file path (Currently obtains the fake file path... Dunno if that's ok)
  2. Call blobService and create a container
  3. Create a page blob and upload
  4. Indicate when finished
*/
function fileUp(element){
  var song = document.getElementById('song')
  console.log("fake path to file:" + song.value);
  //Will fail because we need to create a blobService prior to function call.
  //Could abstract this by another function
  blobService.createContainerIfNotExists("test", {publicAccessLevel: "test"}, function(err){
    console.log("Ran into error");
  });

  //wrap in if statement if upload was successful
  demoSong = null;
  selectUploadOption($(element).parent());
}
