// Broken Basic OO Pong
// by Pippin Barr
//
// A broken primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;  // FIXED
var leftPaddle;
var rightPaddle;

// setup()
//
// Creates the ball and paddles
function setup() {
  // FIXED
  createCanvas(640,480);
  noStroke();
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5);  // FIXED
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,UP_ARROW,DOWN_ARROW);// FIXED
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  // FIXED
  leftPaddle = new Paddle(0,height/2,10,60,10,87,83);   // FIXED
}
// FIXED


// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();
// FIXED
  if (ball.isOffScreen() == true){
    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);
   // FIXED
  push();
  fill(255);
  pop();
  ball.display();
  leftPaddle.display();
  // FIXED
  rightPaddle.display();
}
