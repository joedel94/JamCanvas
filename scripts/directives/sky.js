var cloud = "<svg viewBox='0 0 105 105' class='item'><path d='M 25,60 a 20,20 1 0,0 0,40 h 50 a 20,20 1 0,0 0,-40 a 10,10 1 0,0 -15,-10 a 15,15 1 0,0 -35,10  z' /></svg>";

var skyAnimation = {
	t_cloud: 20,

	init: function() {
		skyAnimation.renderSkyItem(cloud, skyAnimation.t_cloud);
		setInterval(function() { skyAnimation.renderSkyItem(cloud, skyAnimation.t_cloud); }, this.t_cloud * 600);
	},
	endConstruction: function(element) {
		$(element).removeClass("in-construction");
		$(element).addClass("animating")
	},
	removeSkyItem: function(element) {
		$(element).remove();
	},
	renderSkyItem: function(itemString, t) {
		var skyItem = $($.parseHTML(itemString)).addClass("in-construction");
		$("#sky").append(skyItem);

		skyItem = $("#sky .in-construction");
		var finishedItem = $("#sky .animating");

		TweenMax.set(skyItem, {right: 0, height: '100px', width: 'auto'});
		TweenMax.to(skyItem, t, {
			right: '100%',
			onStart: this.endConstruction(skyItem),
			ease: Power0.easeNone
		});

		TweenMax.delayedCall(t, function() { skyAnimation.removeSkyItem(finishedItem)});
	}

}

