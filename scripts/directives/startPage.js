$("#startPage").ready(function(event) {
    attractAnimation.init();
});

var attractAnimation = {
	staffLines: null,
	init: function() {
		this.staffLines = $(".staff .line");

		this.setElements();
		this.aniStaffLines();
		this.aniNotes();
	},
	setElements: function() {
		TweenMax.set(this.staffLines, {width: "0%"});
	},
	aniStaffLines: function() {
		var d = 0;
		
		$(this.staffLines).each(function() {
			TweenMax.to(this, .5, {width: "100%", delay: d});
			d += .3;
		});
	},
	aniNotes: function() {
	}
}
