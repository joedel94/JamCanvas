$.getScript("scripts/app.js");
$.getScript("scripts/directives/buildings.js");
$.getScript("scripts/directives/sky.js").done(function() {
	skyAnimation.init();
});

var animationPreset = {
	shortSongMax: 1700000,
	mediumSongMax: 10000000,
	setTheme: function(fileSize) {
		console.log(fileSize);
		if (fileSize < this.shortSongMax) {
			$("#canvasPage").addClass("shortSong");
		}
		else if (fileSize < this.mediumSongMax) {
			$("#canvasPage").addClass("medSong");
		}
		
	}
}

