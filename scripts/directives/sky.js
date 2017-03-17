var skyItem = [
	"<svg viewBox='0 0 105 105' class='item'><path d='M 25,60 a 20,20 1 0,0 0,40 h 50 a 20,20 1 0,0 0,-40 a 10,10 1 0,0 -15,-10 a 15,15 1 0,0 -35,10  z' /></svg>"
]

var skyAnimation = {
	skyItem: [],

	init: function() {

	},
	selectSkyItem: function() {
		var min = 0;
		var max = skyItem.length - 1;
		var rand = Math.floor(Math.random() * (max - min + 1)) + min;
		return $($.parseHTML(skyItem[rand])); //maybe have preparsed buidings in the array		
	},
	renderLiveBuilding: function(frequency) {
		var item = this.selectSkyItem().addClass('in-construction');
		$("#skyFactory").append(scaffolding);

		item = $("#skyFactory .in-construction");
		var finishedBuilding = $("#liveNoiseFactory .animating");

		var t = 5; //calculate using BPM
		var buildingHeight = (frequency / this.maxMedFrequency) * 100;
		TweenMax.set(scaffolding, {right: 0, height: buildingHeight + "%"});
		TweenMax.to(scaffolding, t, {
			right: '100%',
			onStart: this.endConstruction(scaffolding),
			ease: Power0.easeNone
		});

		TweenMax.delayedCall(t, function() { renderAnimation.demolishBuilding(finishedBuilding)});
	},

}

