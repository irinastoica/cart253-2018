/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;
//time varrable for snitch;
var tx = 0;
var ty = 0;
//noise varriable for snitch;
var nx = 0;
var ny = 0;
// harry position, size, velocity
var harryX;
var harryY;
var harryRadius = 25;
var harryVX = 0;
var harryVY = 0;
var harryMaxSpeed = 55;
var harryNormalSpeed = 1;
// harry health
var harryHealth;
var harryMaxHealth = 555;
// harry image
var harryImage;

// snitch position, size, velocity
var snitchX;
var snitchY;
var snitchRadius = 25;
var snitchVX;
var snitchVY;
var snitchMaxSpeed = 2;
var snitchNormalSpeed = 1;
// snitch health
var snitchHealth;
var snitchMaxHealth = 150;
// snitch fill color


// Amount of health obtained per frame of "eating" the snitch
var eatHealth = 10;
// Number of snitch eaten during the game
var snitchEaten = 0;
// The background image of the canvas
var backgroundImage;
//  shift option
var pressShift = false;
// level up
var levelUp;

var healthBar;
// game sound
var gameSound;


// loading the images
function preload() {
backgroundImage = loadImage("assets/images/background.jpg");
harryImage = loadImage("assets/images/harry-potter.png");
snitchImage = loadImage("assets/images/golden-snitch.png");
font1 = loadFont("assets/fonts/harry-potter.ttf");
gameSound = new Audio("assets/sounds/harrypotter.mp3");
}
// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);

  noStroke();
  setupsnitch();
  setupharry();
  //setup the game song
  gameSound.loop =  true;
  gameSound.play();
}

// setupsnitch()
//
// Initialises snitch's position, velocity, and health
function setupsnitch() {
  snitchX = width/5;
  snitchY = height/2;
  snitchVX = -snitchMaxSpeed;
  snitchVY = snitchMaxSpeed;
  snitchHealth = snitchMaxHealth;
}

// setupharry()
//
// Initialises harry position and health
function setupharry() {
  harryX = 4*width/5;
  harryY = height/2;
  harryHealth = harryMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of snitch and harry,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  // the background image
  background(backgroundImage);

  if (!gameOver) {
    handleInput();

    moveharry();
    movesnitch();

    updateHealth();
    checkEating();

    drawsnitch();
    drawharry();

     drawHealthBar();

  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts harry velocity accordingly
function handleInput() {
  textAlign(CENTER,CENTER);
  textFont(font1);
  textSize(40);
  noStroke();
  fill(248,231,45);
  text("PRESS SHIFT TO GO FASTER, BUT LOSE MORE ENERGY",width/2,height/10);
  //sprint function
  if (keyIsDown(SHIFT)) {
    //shift will allow the harry ot acelerate at a cost of health
    // Press shift advice


harryMaxSpeed = harryMaxSpeed + 0.2;
//subtract 1.2 health per everyframe shift is held
harryHealth = harryHealth - 1.2;
  }
  // reset speed when shift is released/if it is not pressed
  else {
    harryMaxSpeed = 2;
  }

  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    harryVX = -harryMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    harryVX = harryMaxSpeed;
  }
  else {
    harryVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    harryVY = -harryMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    harryVY = harryMaxSpeed;
  }
  else {
    harryVY = 0;
  }
}

// moveharry()
//
// Updates harry position based on velocity,
// wraps around the edges.
function moveharry() {
  // Update position
  harryX += harryVX;
  harryY += harryVY;

  // Wrap when harry goes off the canvas
  if (harryX < 0) {
    harryX += width;
  }
  else if (harryX > width) {
    harryX -= width;
  }

  if (harryY < 0) {
    harryY += height;
  }
  else if (harryY > height) {
    harryY -= height;
  }
}

// updateHealth()
//
// Reduce the harry's health (every frame)
// Check if the harry is dead
function updateHealth() {
  // Reduce harry health, constrain to reasonable range
  harryHealth = constrain(harryHealth - 0.5,0,harryMaxHealth);
  // Check if the harry is dead
  if (harryHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// ()
//
// Check if the harry overlaps the snitch and updates health of both
function checkEating() {
  // Get distance of harry to snitch
  var d = dist(harryX,harryY,snitchX,snitchY);
  // Check if it's an overlap
  if (d < harryRadius + snitchRadius) {
    // Increase the harry health
    harryHealth = constrain(harryHealth + eatHealth,0,harryMaxHealth);
    // Reduce the snitch health
    snitchHealth = constrain(snitchHealth - eatHealth,0,snitchMaxHealth);

    // Check if the snitch died
    if (snitchHealth === 0) {
      if (levelUp == 0){
          snitchNormalSpeed -= 2;
        }
        //increase player playerMaxSpeed
        if (levelUp == 1){
          snitchMaxSpeed+=10;
        }
        // Give it full health
        snitchHealth = snitchMaxHealth;
        // Track how many prey were eaten
        snitchEaten++;
    }
  }
}

// movesnitch()
// Moves the snitch based on random velocity changes
function movesnitch() {
  //noise time values
    tx = tx + .005;
    ty = ty + .015;
    nx = noise(tx);
    ny = noise(ty);
    //map noise to correspond to snitch XY velocity
    snitchVX = map(nx,0,1,-snitchMaxSpeed,snitchMaxSpeed);
    snitchVY = map(ny,0,1,-snitchMaxSpeed,snitchMaxSpeed);

  // Update snitch position based on velocity
  snitchX += snitchVX;
  snitchY += snitchVY;
  // Screen wrapping
  if (snitchX < 0) {
    snitchX += width;
  }
  else if (snitchX > width) {
    snitchX -= width;
  }

  if (snitchY < 0) {
    snitchY += height;
  }
  else if (snitchY > height) {
    snitchY -= height;
  }
}

// drawsnitch()
//
// Draw the snitch as an ellipse with alpha based on health
function drawsnitch() {
  image(snitchImage, snitchX, snitchY);
}

// drawharry()
//
// Draw the harry as an ellipse with alpha based on health
function drawharry() {
    image(harryImage, harryX, harryY);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  gameSound.pause();
  textSize(60);
  textAlign(CENTER,CENTER);
  fill(243,231,45);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You caught " + snitchEaten + " snitch\n";
  gameOverText += "before you died."
  text(gameOverText,width/2,height/2);
}


// Draws a energy1 bar at the bottom
function drawHealthBar(){
  push();
  rectMode(CORNER);
  //background rectangle of health bar
  fill(64,43,112);
  rect(0,height-50,width/1 + 10,30);
  //The health bar
  fill(153, 153, 255);
  healthBar = map(harryHealth,0,harryMaxHealth, 0, width);
  rect(0, height-50,healthBar,30);
  //Text showing the Energy level
  textFont ("Helvetica")
  fill(64,43,112);
  textSize(15);
  textAlign(CENTER,CENTER);
  var energyText = "ENERGY LEFT";
  text(energyText,width/2,height-35);
  pop();
}
