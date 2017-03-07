console.log("canvasPage");

//calculate before each building is added and remove .each() function
// and do $(".windows", element).each();
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


var buildings = [
  '<div class="building building0"><div class="shape block4"></div><div class="block block3"></div><div class="block block2"></div><div class="block block1 windows"></div><div class="block block0"></div></div>',
  '<div class="building building1"><div class="block block3"></div><div class="block block2"></div><div class="block block1 windows"></div><div class="block block0"></div></div>'
]

var renderAnimation = {
  maxLowFrequency: 100, //dictate 100% height for each level
  maxMedFrequency: 200,
  maxHighFrequency: 300,
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
  },
  // demolishBuilding: function(element) {
  //   $(element).remove();
  // },
  renderLiveBuilding: function(frequency) {
    var scaffolding = this.selectBuilding().addClass('high-frequency in-construction');
    $("#liveNoiseFactory").append(scaffolding);

    scaffolding = $("#liveNoiseFactory .in-construction");
    TweenMax.set(scaffolding, {x: 0});
    TweenMax.to(scaffolding, 2, {x: -300, onStart: renderAnimation.endConstruction(scaffolding)});
  }
}

