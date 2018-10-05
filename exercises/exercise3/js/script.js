/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
var targetX;
var targetY;
var targetImage;
var targetSize;


// The dog moves randomly when the game is over
var targetImageSpeed;
var targetImageVX;


// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
var numDecoys = 100;

// Keep track of whether they've won
var gameOver = false;

//Loads the target image in the image
var targetImage;
var targetImageX;
var targetImageY;

// Loads a rectangle interface at the top right corner of the screen
var poster;
var posterX;
var posterY;
var posterW;
var posterH;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");


}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);

  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough
    if (r < 0.1) {
      image(decoyImage1,x,y);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y);
    }
  }

  //Preparing the size of the poster
  posterX = width - 201;
  posterY = 0;
  posterW = 200;
  posterH = 300;


  // Once we've displayed all decoys, we choose a location for the target
  targetX = random(0,width);
  targetY = random(0,height);
  targetSize = random(25,100);

  // dog not going underneath the poster
  while (targetX>posterX && targetY< posterY+posterH) {
    targetX = random(0,width);
    targetY = random(0,height);
  }

  // And draw it (this means it will always be on top)
  image(targetImage,targetX,targetY,targetSize);

}

function draw() {
  //DRAWING THE POSTER SIZING AND COLOR
  fill(34,94,27);
  rect(posterX,posterY, posterW,posterH);
  image(targetImage,posterX + posterW /2,posterY + posterH/2,posterW/2,posterH/2);

  // Position of the FIND ME text
  textSize(20);
  fill(243,231,45);
  textAlign(CENTER);
  text("FIND ME!",posterX + posterW /2,posterY + posterH/2+50);




  if (gameOver) {
    // Prepare our typography
    textFont("Helvetica");
    textSize(80);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));
    background(random(0, 200), random(0, 200), random(0, 200));
    // Tell them they won!
    text("YAY YOU FOUND ME!",width/2,height/2);

    noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(targetX,targetY,targetImage.width,targetImage.height);

    //The dog popping up
    targetImageX = random(0,width);
    targetImageY = random(0,height);

    // The variation of speed of the dogs appearing
    targetImageSpeed = random(5,200);
    targetImageVX = random(5,300);
    targetSize = random(2,100);

    // The speed of the dog
    targetImageVX = targetImageSpeed;
    targetImageX = targetImageX + targetImageVX;
    targetImageY = targetImageY + targetImageVX;

    image(targetImage,targetImageX,targetImageY);

  }
}
// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}
