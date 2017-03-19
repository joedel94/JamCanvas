var cloud = "<svg viewBox='0 0 105 105' class='item'><path d='M 25,60 a 20,20 1 0,0 0,40 h 50 a 20,20 1 0,0 0,-40 a 10,10 1 0,0 -15,-10 a 15,15 1 0,0 -35,10  z' /></svg>";

var skyAnimation = {

	init: function() {
		this.renderClouds();
		setInterval(skyAnimation.renderClouds, 6000);
	},
	endConstruction: function(element) {
		$(element).removeClass("in-construction");
		$(element).addClass("animating")
	},
	removeSkyItem: function(element) {
		$(element).remove();
	},
	renderClouds: function() {
		var skyItem = $($.parseHTML(cloud)).addClass("in-construction");
		$("#sky").append(skyItem);

		skyItem = $("#sky .in-construction");
		var finishedItem = $("#sky .animating");


		var t = 20;

		var height_min = 300;
		var height_max = 100;
		var height_rand = Math.floor(Math.random() * (height_max - height_min + 1)) + height_min;

		var bottom_min = 0;
		var bottom_max = 90;
		var bottom_rand = Math.floor(Math.random() * (bottom_max - bottom_min + 1)) + bottom_min;

		TweenMax.set(skyItem, {right: 0, bottom: bottom_rand + '%', height: height_rand + 'px', width: 'auto'});
		TweenMax.to(skyItem, t, {
			right: '100%',
			onStart: skyAnimation.endConstruction(skyItem),
			ease: Power0.easeNone
		});

		TweenMax.delayedCall(t, function() { skyAnimation.removeSkyItem(finishedItem)});
	}

}

