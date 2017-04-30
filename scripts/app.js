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

var canvas = document.querySelector('.visualizer');
var canvasCtx = canvas.getContext("2d");

var analyser = audioCtx.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;

// grab audio track via XHR for convolver node

var soundSource, concertHallBuffer;

ajaxRequest = new XMLHttpRequest();

ajaxRequest.open('GET', 'audio/frequency-demo.mp3', true);

ajaxRequest.responseType = 'arraybuffer';


ajaxRequest.onload = function() {
  var audioData = ajaxRequest.response;

  audioCtx.decodeAudioData(audioData, function(buffer) {
      console.log(buffer);
      concertHallBuffer = buffer;
      soundSource = audioCtx.createBufferSource();
      console.log(soundSource);
      soundSource.buffer = concertHallBuffer;
      // Connects request to analyzer
      soundSource.connect(analyser)

      // Actually outputs the sound
      soundSource.connect(audioCtx.destination);
      soundSource.loop = true;
      soundSource.start();
      visualize();
      voiceChange();
    }, function(e){"Error with decoding audio data" + e.err});
}

ajaxRequest.send();



// var intendedWidth = document.querySelector('.wrapper').clientWidth;

// canvas.setAttribute('width',intendedWidth);

var visualSelect = document.getElementById("visual");
var waveShaper = audioCtx.createWaveShaper();

var drawVisual;

//main block for doing the audio recording

/*if (navigator.getUserMedia) {
   console.log('getUserMedia supported.');
   navigator.getUserMedia (
      // constraints - only audio needed for this app
      {
         audio: true
      },

      // Success callback
      function(stream) {
         source = audioCtx.createMediaStreamSource(stream);
         source.connect(analyser);
         analyser.connect(waveShaper);

         visualize();
      },

      // Error callback
      function(err) {
         console.log('The following gUM error occured: ' + err);
      }
   );
} else {
   console.log('getUserMedia not supported on your browser!');
}*/

function visualize() {
  WIDTH = canvas.width;
  HEIGHT = canvas.height;


  var visualSetting = visualSelect.value;

  if(visualSetting == "sinewave") {
    analyser.fftSize = 2048;
    var bufferLength = analyser.fftSize;
    var freqBuffLength = analyser.frequencyBinCount;
    var freqDataArray = new Uint8Array(freqBuffLength);
    var dataArray = new Uint8Array(bufferLength);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    function draw() {

      drawVisual = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);
      analyser.getByteFrequencyData(freqDataArray);


      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

      canvasCtx.beginPath();

      var sliceWidth = WIDTH * 1.0 / bufferLength;
      var x = 0;

      for(var i = 0; i < bufferLength; i++) {
   
        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT/2;

        if(freqDataArray[i]>140){
          canvasCtx.strokeStyle = 'rgb(' + (freqDataArray[i]+50) + ',100,100)';
          if(freqDataArray[i]>150){
          canvasCtx.strokeStyle = 'rgb(' + (freqDataArray[i]+100) + ',50,50)'; 
          }
        }

        if(i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height/2);
      canvasCtx.stroke();
    };

    draw();

  } else if(visualSetting == "frequencybars") {
    var count = 0; // Just for debugging. ****REMOVE BEFORE PROD****
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

      if(count == 50){ //change eventually to reflect BPM of loaded song

        console.log(dataArray);
        renderAnimation.renderLiveBuilding(dataArray[10]); //sends render the med frequencies
        renderAnimation.renderHighFreqBuilding(dataArray[20]); //temp, move to actual song render
        renderAnimation.renderMedFreqBuilding(dataArray[10]); //temp, move to actual song render
        renderAnimation.renderLowFreqBuilding(dataArray[0]);
        //dataArray[0] for low frequ, dataArray[20] for high freq
        
        count = 0;
      }else
        count++;


      for(var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

        x += barWidth + 1;
      }
    };

    draw();

  } else if(visualSetting == "off") {
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.fillStyle = "red";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  }

}

visualSelect.onchange = function() {
  window.cancelAnimationFrame(drawVisual);
  visualize();
}