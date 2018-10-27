// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey,leftKey,rightKey) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  this.upScore = false;
  // the starting score is 0

  Paddle
    .prototype
    .updateScore = function () {
    if (this.gainScore === true) {
        this.score ++;
        this.gainScore = false;
    }
    textAlign(RIGHT);
    fill(255);
    textSize(15);
    text('YOUR SCORE    ' + leftPaddle.score, 200, 40);
    text('YOUR SCORE    ' + rightPaddle.score, width - 80, 40);
}
  this.score = 0;
  this.leftKey = leftKey;
  this.rightKey = rightKey;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h);
}

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  fill(255);
  rect(this.x,this.y,this.w,this.h);
}
// keep the score of the paddles
Paddle.prototype.updateScore = function () {
    if (this.upScore === true) {
        this.score ++;
        this.upScore = false;
    }
    fill(255);
    textSize(30);
    textAlign(left);
    text('Score    ' + leftPaddle.score, 60, 35);
    text('Score    ' + rightPaddle.score, width - 60, 35);
}
