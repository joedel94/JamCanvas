//Draw Script for jam canvas
//Based on modular shape design functions
//Benny Feldman
//Created 1/28/17



//animation vars
var moveX = 100;
var color = '';
	
 window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();

  function animate(canvas, context, startTime) {
	// update
	var time = (new Date()).getTime() - startTime;
	var linearSpeed = 100; // pixels / second

	//Update variables for animation
	//Update x value of rectangle
	moveX = linearSpeed * time / 1000;
	//Make this loop
	
	//Clear last
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	//Draw New	
	//makeBox(0,140, 100,280, 3, '#8ED6FF'); //Outer Walls
	//multiBox(0,150,3,8,30, '#FFFFFF');
	
	makeBox(moveX,140, 100,280, 3, '#8ED6FF'); //Outer Walls
	multiBox(moveX,150,3,8,30, '#FFFFFF'); 
	
	//building(150,150,100,100,2,'#8ED6FF','#FFFFFF')
	
	//Background
	//makeBox(140,140, 100,280); //Outer Walls
	
	//recursively call self, request new frame
	requestAnimFrame(function() {
	  animate(canvas, context, startTime);
	});
  }
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');

  // wait one second before starting animation
  setTimeout(function() {
	var startTime = (new Date()).getTime();
	animate(canvas, context, startTime);
  }, 1000);


//Get canvas from html and context (ctx) position
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//Box creation
var w = 0; //horizontal size
var h = 0; //vertical size

//First building prototype
//makeBox(140,140, 100,280, 2, '#8ED6FF' ); //Outer Walls
//multiBox(150,150,3,8,30, '#FFFFFF'); //Inner Windows

function building(x,y,w,h,bw,colorA,colorB)
{
	makeBox(x,y,w,h,bw,colorA);
	
	//Standard window width is 20, dist is 30
	r = w % 30;
	c = h % 30;
	multiBox(x,y,r,c,30,colorB);
}

//Start x, start y, w is num boxes width, h is num boxes height, d is distance between
//you want d to be larger than 20, which is standard box size
function multiBox(x, y, w, h, d, color)
{
	for(i = 0; i < w; i++) //Rows
	{
		for(j = 0; j < h; j++) //Collumns
		{
			makeBox(x + (i * d), y + (j * d), 20, 20, 2, color);			
		}
	}
}

//start x, start y, width, height
function makeBox(x, y, w, h, bw, color) { 	

	//Goes in a counter-clockwise loop, drawing a box
	context.beginPath();
	context.rect(x, y, w, h);
	context.fillStyle = color;
	context.fill();
	context.lineWidth = bw;
	context.strokeStyle = 'black';
	context.stroke();
	
}
