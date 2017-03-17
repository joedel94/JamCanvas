var buildings = [
	'<div class="building building0"><div class="block block0 windows"></div></div>',
	'<div class="building building1"><div class="shape block4"></div><div class="block block3"></div><div class="block block2"></div><div class="block block1 windows"></div><div class="block block0"></div></div>',
	'<div class="building building2"><div class="block block4"></div><div class="block block3"></div><div class="block block2"></div><div class="block block1"></div><div class="block block0 windows"></div></div>'

]

var renderAnimation = {
	maxLowFrequency: 200.00, //dictate 100% height for each level
	maxMedFrequency: 200.00,
	maxHighFrequency: 300.00,
	buildings: [],

	init: function() {

	},
	selectBuilding: function() {
		var min = 0;
		var max = buildings.length - 1;
		var rand = Math.floor(Math.random() * (max - min + 1)) + min;
		return $($.parseHTML(buildings[rand])); //maybe have preparsed buidings in the array
		
	},
	endConstruction: function(element) {
		$(element).removeClass("in-construction");
		$(element).addClass("animating")
	},
	demolishBuilding: function(element) {
		$(element).remove();
	},
	renderLiveBuilding: function(frequency) {
		var scaffolding = this.selectBuilding().addClass('live-noise in-construction');
		$("#liveNoiseFactory").append(scaffolding);

		scaffolding = $("#liveNoiseFactory .in-construction");
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
	renderHighFreqBuilding: function(frequency) {
		var scaffolding = this.selectBuilding().addClass('high-frequency in-construction');
		$("#highFreqFactory").append(scaffolding);

		scaffolding = $("#highFreqFactory .in-construction");
		var finishedBuilding = $("#highFreqFactory .animating");

		var t = 7; //calculate using BPM
		var buildingHeight = (frequency / this.maxHighFrequency) * 100;
		TweenMax.set(scaffolding, {right: 0, height: buildingHeight + "%"});
		TweenMax.to(scaffolding, t, {
			right: '100%',
			onStart: this.endConstruction(scaffolding),
			ease: Power0.easeNone
		});

		TweenMax.delayedCall(t, function() { renderAnimation.demolishBuilding(finishedBuilding)});
	},
	renderMedFreqBuilding: function(frequency) {
		var scaffolding = this.selectBuilding().addClass('med-frequency in-construction');
		$("#medFreqFactory").append(scaffolding);

		scaffolding = $("#medFreqFactory .in-construction");
		var finishedBuilding = $("#medFreqFactory .animating");

		var t = 10; //calculate using BPM
		var buildingHeight = (frequency / this.maxMedFrequency) * 100;
		TweenMax.set(scaffolding, {right: 0, height: buildingHeight + "%"});
		TweenMax.to(scaffolding, t, {
			right: '100%',
			onStart: this.endConstruction(scaffolding),
			ease: Power0.easeNone
		});

		TweenMax.delayedCall(t, function() { renderAnimation.demolishBuilding(finishedBuilding)});
	},
	renderLowFreqBuilding: function(frequency) {
		var scaffolding = this.selectBuilding().addClass('low-frequency in-construction');
		$("#lowFreqFactory").append(scaffolding);

		scaffolding = $("#lowFreqFactory .in-construction");
		var finishedBuilding = $("#lowFreqFactory .animating");

		var t = 12; //calculate using BPM
		var buildingHeight = (frequency / this.maxLowFrequency) * 100;
		TweenMax.set(scaffolding, {right: 0, height: buildingHeight + "%"});
		TweenMax.to(scaffolding, t, {
			right: '100%',
			onStart: this.endConstruction(scaffolding),
			ease: Power0.easeNone
		});

		TweenMax.delayedCall(t, function() { renderAnimation.demolishBuilding(finishedBuilding)});
	}
}


function calculateWindows(element) {

	var border_size = parseInt($("#window-model").css("border-left-width"));
	var window_height = $("#window-model").height() + (2 * border_size);
	var window_width = $("#window-model").width() + (2 * border_size);
	$(".windows").each(function() {


		var windows_per_row = Math.floor($(this).width() / window_width);
		var num_window_rows = Math.floor($(this).height() / window_height);

		console.log(windows_per_row, num_window_rows);

		var windows_html = "";
		while (num_window_rows > 0) {
			windows_html += "<div class='window-row'>"
			for (var i = 0; i < windows_per_row; i++) {
				windows_html += "<div class='window'></div>"
			}
			windows_html +="</div>"; 
			num_window_rows--;
		}

		$(this).html(windows_html);
	});
}

