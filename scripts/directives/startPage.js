$("#startPage").ready(function(event) {
    attractAnimation.init();
});

var attractAnimation = {
	staffLines: null,
	init: function() {
		this.staffLines = $(".staff .line");
		this.notes = $(".notes .note");
		this.canvas = $(".logo .canvas");
		this.text = $(".logo .text");
		this.cta = $(".titles");

		this.setElements();

		TweenMax.to(this.canvas, 1, {alpha: 1});
		TweenMax.to(this.text, 1.5, {alpha: 1, delay: 1});
		this.aniStaffLines();
		this.aniNotes();
	},
	setElements: function() {
		TweenMax.set(this.staffLines, {width: "0%"});
		TweenMax.set(this.notes, {alpha: 0});
		TweenMax.set(this.canvas, {alpha: 0});
		TweenMax.set(this.text, {alpha: 0});
		TweenMax.set(this.cta, {alpha: 0});

	},
	aniStaffLines: function() {
		var d = 0;
		
		$(this.staffLines).each(function() {
			TweenMax.to(this, .5, {width: "100%", delay: d});
			d += .3;
		});
	},
	aniNotes: function() {
		var d = 0;
		$(this.notes).each(function() {
			TweenMax.to(this, .5, {alpha: 1, repeat: -1, repeatDelay: 5, yoyo: true, delay: d});
			d += .3;
		});
	}
}
