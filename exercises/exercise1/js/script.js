// Exercise 1 - Moving pictures
// Pippin Barr
//
// Starter code for exercise 1.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.


// The image of a clown face
var clownImage;
// The current position of the clown face
var clownImageX;
var clownImageY;

// The image of a dog image
var dogImage;
// The current position of the dog image
var dogImageX;
var dogImageY;

// The image of a ball image
var ballImage;
// The current position of the ball image
var ballImageX;
var ballImageY;

// The image of a ball image
var candyImage;
// The current position of the ball image
var candyImageX;
var candyImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;



// preload()
//
// Load the three images we're using before the program starts

function preload() {
  clownImage = loadImage("assets/images/clown.png");
  dogImage = loadImage("assets/images/dog-image.png");
  ballImage = loadImage("assets/images/ball.png");
  candyImage = loadImage("assets/images/candy.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;

  // Start the dog image at the left side of the canvas and moves from left to right across the canvas
  dogImageX = 0;
  dogImageY = height/2;


  // Start the candy image at the centre of the canvas
  candyImageX = width/2;
  candyImageY = height/2;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}


// draw()
//
// Moves the felt image linearly
// Moves the clown face toward the current mouse location

function draw() {

  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;

  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);

  // Move the clown by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var xDistance = mouseX - clownImageX;
  var yDistance = mouseY - clownImageY;
  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistance/10;
  clownImageY = clownImageY + yDistance/10;
  // Display the clown image
  image(clownImage,clownImageX,clownImageY);


  // move the candy towards the right and slightly up
    candyImageX += 1;
    candyImageY -= 2;

  // Display the candy image
  image(candyImage,candyImageX,candyImageY);

  // Start ball image exactly where the mouse is
   ballImageX = mouseX;
   ballImageY = mouseY;
  // Display the ball image and make it the size 50px50px
  image(ballImage,ballImageX,ballImageY,50,50);

  // Move the dog image right by increasing its x position
  dogImageX += 1;
  // Display the dog image
  image(dogImage,dogImageX,dogImageY);



}
