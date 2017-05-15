console.log("selectPage");

function selectUploadOption() {
	$(".begin-projection").removeClass("disabled");
}

function selectDemo() {
	demoSong = $("#demo").val();
	if (demoSong) {
		selectUploadOption();
	}	
}
