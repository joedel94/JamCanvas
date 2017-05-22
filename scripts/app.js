/* Music Fair Use Credit
* Blind Love Dub by Jeris (c) copyright 2017 
* Licensed under a Creative Commons Attribution (3.0) license. 
* http://dig.ccmixter.org/files/VJ_Memes/55416 
* Ft: Kara Square (mindmapthat)
*/


// fork getUserMedia for multiple browser versions, for those
// that need prefixes

navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);

// set up forked web audio context, for multiple browsers
// window. is needed otherwise Safari explodes

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var voiceSelect = document.getElementById("voice");
var source;
var stream;


navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);

// set up forked web audio context, for multiple browsers
// window. is needed otherwise Safari explodes

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var voiceSelect = document.getElementById("voice");
var source;
var stream;

var audioCtxLive = new (window.AudioContext || window.webkitAudioContext)();
var sourceLive;
var streamLive;

var canvas = document.querySelector('.visualizer');
var canvasCtx = canvas.getContext("2d");

var canvasLive = document.querySelector('.visualizer');
var canvasCtxLive = canvasLive.getContext("2d");

var analyser = audioCtx.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;

var analyserLive = audioCtxLive.createAnalyser();
analyserLive.minDecibels = -90;
analyserLive.maxDecibels = -10;
analyserLive.smoothingTimeConstant = 0.85;

// grab audio track via XHR for convolver node

var soundSource, concertHallBuffer;

ajaxRequest = new XMLHttpRequest();

if (selectedSong) {
  ajaxRequest.open('GET', 'audio/' + selectedSong, true);

  ajaxRequest.responseType = 'arraybuffer';


  ajaxRequest.onload = function() {
    var audioData = ajaxRequest.response;

    animationPreset.setTheme(audioData.byteLength);

    audioCtx.decodeAudioData(audioData, function(buffer) {
        //console.log(buffer);
        concertHallBuffer = buffer;
        soundSource = audioCtx.createBufferSource();
        //console.log(soundSource);
        soundSource.buffer = concertHallBuffer;
        // Connects request to analyzer
        soundSource.connect(analyser)

        // Actually outputs the sound
        soundSource.connect(audioCtx.destination);
        soundSource.loop = true;
        soundSource.start();
        visualize();
      }, function(e){"Error with decoding audio data" + e.err});
  }

  ajaxRequest.send();
}



// var intendedWidth = document.querySelector('.wrapper').clientWidth;

// canvas.setAttribute('width',intendedWidth);

var visualSelect = document.getElementById("visual");
var visualSelectLive = document.getElementById("visual-live");
var waveShaper = audioCtx.createWaveShaper();
var waveShaperLive = audioCtxLive.createWaveShaper();

var drawVisual;
var drawVisualLive;

//main block for doing the audio recording

if (navigator.getUserMedia) {
   console.log('getUserMedia supported.');
   navigator.getUserMedia (
      // constraints - only audio needed for this app
      {
         audio: true
      },

      // Success callback
      function(stream) {
         sourceLive = audioCtxLive.createMediaStreamSource(stream);
         sourceLive.connect(analyserLive);
         analyserLive.connect(waveShaperLive);

         visualizeLive();
      },

      // Error callback
      function(err) {
         console.log('The following gUM error occured: ' + err);
      }
   );
} else {
   console.log('getUserMedia not supported on your browser!');
}

function visualizeLive() {

  console.log("visualize live");

  var visualSettingLive = visualSelectLive.value;

  
  var countLive = 0; // Just for debugging. ****REMOVE BEFORE PROD****
  analyserLive.fftSize = 256; // Change number of bars 
  var bufferLength = analyserLive.frequencyBinCount; // Actual number of bin sets
  var dataArrayLive = new Uint8Array(bufferLength);

  function drawLive() {
    drawVisualLive = requestAnimationFrame(drawLive);

    analyserLive.getByteFrequencyData(dataArrayLive);


    if(countLive == 50){ //change eventually to reflect BPM of loaded song

      renderAnimation.renderLiveBuilding(dataArrayLive[10]); //sends render the med frequencies
      if (!selectedSong) {
        renderAnimation.renderHighFreqBuilding(dataArrayLive[20]);
        renderAnimation.renderMedFreqBuilding(dataArrayLive[10]);
        renderAnimation.renderLowFreqBuilding(dataArrayLive[0]);        
      }
      
      countLive = 0;
    }else
      countLive++;
  };
  drawLive();
}

function visualize() {
  WIDTH = canvas.width;
  HEIGHT = canvas.height;


  var visualSetting = visualSelect.value;

  
  var count = 0; // Handles spacing between buildings (how many times a new building is needed to be rendered)
  analyser.fftSize = 256; // Change number of bars 
  var bufferLength = analyser.frequencyBinCount; // Actual number of bin sets
  var dataArray = new Uint8Array(bufferLength);

  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

  function draw() {
    drawVisual = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    if(count == 50){ 
      renderAnimation.renderHighFreqBuilding(dataArray[20]); //temp, move to actual song render
      renderAnimation.renderMedFreqBuilding(dataArray[10]); //temp, move to actual song render
      renderAnimation.renderLowFreqBuilding(dataArray[0]);
      count = 0;
    }else
      count++;
  };
  draw();
}

visualSelect.onchange = function() {
  window.cancelAnimationFrame(drawVisual);
  visualize();
}
visualSelectLive.onchange = function() {
  window.cancelAnimationFrame(drawVisualLive);
  visualizeLive();
}