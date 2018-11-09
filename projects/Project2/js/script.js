// The jurrasic World
// by Irina Stoica


// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;
////// the states of the game //////
var state = "Title";
// the sound of the ball hitting the paddles
var jurrasicSound;
// ambience music of the whole game
var jurrasicMain;

// var bbArrayL = [];
// var bbArrayR = [];

function preload(){
  backgroundImage = loadImage("assets/images/background.jpg");
  titleBackground = loadImage("assets/images/title-background.jpg");
// Load fonts
  jurassicFont = loadFont("assets/fonts/jurassic.ttf");
  //Load Sounds
  jurrasicSound = new Audio ("assets/sounds/jurrasic.wav");
  jurrasicMain = new Audio ("assets/sounds/jurrasic-theme.wav");
}

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(1000, 597);
  // Create a ball
  ball = new Ball(width / 2, height / 2, 5, 5, 10, 5, 15);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width - 10, height / 2, 10, 60, 15, DOWN_ARROW, UP_ARROW, 0);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0, height / 2, 10, 60, 15, 83, 87, 0);

}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(backgroundImage);

  console.log(state);
  switch (state) {

    case "Title":
      displayTitle();
      break;

    case "GAME":
      displayGame();
      break;
  }

}
////// NEW //////
function displayTitle() {

  textFont(jurassicFont);
  textAlign(CENTER, CENTER)
  background(titleBackground);
  textSize(200);
  fill(255)
  text("Jurrasic World", width/2, 250);
  textFont('Georgia');
  textSize(28  );
  text("You need to reach 10 in order to win. Good luck! ",width/2, 350);
  textSize(30);
  text("CLICK THE SPACE BAR TO START! ",width/2,500);
  if (keyIsPressed && key === ' ') {
    // If the space bar is pressed, the draw function will change to the draw one
    state = "GAME";
  }
}

function displayGame() {
  jurrasicMain.play();

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  if (ball.isOffScreen()) {
    // Check which side of the screen earn the points
    // give the points to the left side
    if (ball.x + ball.size < 0) {
      leftPaddle.score++;
    }
// give the points to the right side
    if (ball.x > width) {
      rightPaddle.score++;
    }
    ball.reset();
  }


  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();

  leftPaddle.display();
  rightPaddle.display();

// Display the score of the right paddle
  if (rightPaddle.score >= 1) {
    rightPaddle.rightScore();
  }
// the score of the left paddle
  if (leftPaddle.score >= 1) {
    leftPaddle.leftScore();
  }

}
