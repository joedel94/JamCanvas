$("#selectPage").ready(function(event) {
    populateUploadList();
});

function populateUploadList() {
  $.get("uploads/list.json", function(data) {
      $.each(data, function(index, item) {
        var optionHtml = '<option value="' + item + '">' + item + '</option>';
        $("#upload").append(optionHtml);
      });
  });
}

function selectSoundOption(option) {
  $(".begin-projection").removeClass("disabled");
  $(".upload-option").removeClass("disabled");
  $(".upload-option").not(option).addClass("disabled");
}

function selectUpload(element) {
  selectedSong = $("#upload").val();
  if (selectedSong) {
    selectSoundOption($(element).parent());
  } 
}

function selectDemo(element) {
	selectedSong = $("#demo").val();
	if (selectedSong) {
		selectSoundOption($(element).parent());
	}	
}

function selectNoSong(element) {
  selectedSong = null;
  selectSoundOption($(element).parent());
}
