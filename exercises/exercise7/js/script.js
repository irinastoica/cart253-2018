// This is a basic Brick-Breaker game
// The game is over when all the bricks are destroyed, or when the ball is dropped.
// Code by Irina Stoica

var paddle;

function setup() {
  createCanvas(700,800)
  paddle = new Paddle();
}

function draw() {
  background(0)
  paddle.display()

}
