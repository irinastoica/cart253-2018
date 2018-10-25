//////////////// FIXED
// Paddle constructor should be a comment, so preceded by "//"
// Paddle constructor
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

//////////////// FIXED
// The next line of comment should be preceded by "//"
//Sets the properties with the provided arguments or defaults
//
//////////////// FIXED
// Syntax error - changed "Pladdle" to "Paddle"
function Paddle(x,y,w,h,speed,downKey,upKey) {
  this.x = x;
  this.y = y;
  this.xv = 0;
  this.yv = 0;
  this.w = w;
  this.h = h;
  //////////////// FIXED
  // Syntax error - removed the extra e in "speeed" to "speed"
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
//
//////////////// FIXED
// Syntax error - changed "proto" to "prototype"
// Logical error - changed "keyIsDown" instead of keyDown so the movement stops when the key is not pressed
// Syntax error - changed "(upKey)" and "(downKey)" to "(this.upKey)" and ("this.downKey")
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  //////////////// FIXED
  // Behavioural error - Changed the sign of "this.speed" .The speed should be positive since the down key is pressed
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  //////////////// FIXED
  // Behavioural error - Added the else statement. The paddle should
  // not move if no key is pressed, so if else the vy should be to 0
  else {
    this.vy = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  //////////////// FIXED
  // Syntax errors - changed "constraint" to "constrain" and "hight" to "height"
  this.y = constrain(this.y,0,height-this.h);
}

// display()
//
// Draw the paddle as a rectangle on the screen
//
//////////////// FIXED
// Syntax errors - changed "disploy" to "display" and removed an extra closing parenthese at "function()"
Paddle.prototype.display = function() {
  //////////////// FIXED
  // Syntax error - changed "rectangle" to "rect"
  rect(this.x,this.y,this.w,this.h);
}
