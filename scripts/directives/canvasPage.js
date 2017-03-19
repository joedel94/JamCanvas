$.getScript("scripts/app.js");
$.getScript("scripts/directives/buildings.js");
$.getScript("scripts/directives/sky.js").done(function() {
	skyAnimation.init();
});

