$("#startPage").ready(function(event) {
    attractAnimation.init();
});

var attractAnimation = {
	init: function() {
		this.staffLines = $(".staff .line");
		this.notes = $(".notes .note");
		this.canvas = $(".logo .canvas");
		this.text = $(".logo .text");
		this.cta = $(".titles");

		this.setElements();

		TweenMax.to(this.canvas, 1, {alpha: 1, delay: .5});
		TweenMax.to(this.text, 2.5, {alpha: 1, delay: 1.5});

		//TweenMax.delayedCall(1, function() {console.log("worked")});
		TweenMax.delayedCall(2, function() { attractAnimation.aniStaffLines() });
		TweenMax.delayedCall(2.5, function() { attractAnimation.aniNotes() });
		//setInterval()
		// this.aniStaffLines();
		// this.aniNotes();

		TweenMax.to(this.cta, 2, {alpha: 1, delay: 3});
	},
	setElements: function() {
		TweenMax.set(this.staffLines, {alpha: 0, width: "0%"});
		TweenMax.set(this.notes, {alpha: 0, y: -7});
		TweenMax.set(this.canvas, {alpha: 0});
		TweenMax.set(this.text, {alpha: 0});
		TweenMax.set(this.cta, {alpha: 0});

	},
	aniStaffLines: function() {
		var d = 0;
		
		$(this.staffLines).each(function() {
			TweenMax.to(this, .5, {alpha: 1, width: "100%", delay: d});
			d += .3;
		});
	},
	aniNotes: function() {
		var d = 0;
		$(this.notes).each(function() {
			TweenMax.to(this, .5, {alpha: 1, y: 0, repeat: -1, repeatDelay: 4, yoyo: true, delay: d});
			d += .3;
		});
	}
}
