/*********************************************************

Exercise 2 - The Artful Dodger
Pippin Barr

Starter code for exercise 2.

*********************************************************/

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 50;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 150;
// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 10;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;
// How much bigger the enemy circle gets with each successful dodge
var enemySpeedIncrease = 0.5;
// The dodges counter font
var font1;
// When you fail font
var font2;

// How many dodges the player has made
var dodges = 0;

// The background image of the canvas
var backgroundImage;
// loading the images
function preload() {
backgroundImage = loadImage("assets/images/background.png");
birdImage = loadImage("assets/images/bird.png");
batImage = loadImage("assets/images/bat.png");
font1 = loadFont("assets/fonts/MontserratAlternates-Black.otf")
font2 = loadFont("assets/fonts/MontserratAlternates-Light.otf")
}
// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // the background image
  background(backgroundImage);
  // the text color
  fill(225,245,176);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // if dodges = 0, "try again"
if (dodges === 0){
  fill(248,221,129,256-enemyX)
  textSize(40);
  text("Try Again",width/2,height/2);
  textFont (font2)
}


    var dodgeText= dodges

    // Display the number of dodges
    textSize(15);
    textAlign(RIGHT);
    textStyle(BOLD);
    text("YOUR SCORE:", 420,25);
    textFont(font1);
    //color of the text
    fill(255,255,255);
    textAlign(CENTER);
    text(dodgeText,440,25);


  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the enemy's size and speed
    enemySize = 150;
    enemySpeed = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;

  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    enemySize = 50;
    enemySpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // Increase the enemy's speed and size to make the game harder
    enemySpeed = enemySpeed + enemySpeedIncrease;
    enemySize = enemySize + enemySizeIncrease;
  }

  // Display the current number of successful in the console
  console.log(dodges);

  // Draw the player as a circle
  image(birdImage,avatarX,avatarY,avatarSize,avatarSize);

  // Display the enemy as the bat
  image(batImage,enemyX,enemyY,enemySize,enemySize);

  // if the the played dodged 10 times display the
     if (dodges >= 10)
     {
       // the background changes
       background(248,221,129);
       // Put the specifications for the win message text
       textFont(font2);
       textSize(45);
       textAlign(CENTER);
       text("You won!",width/2, height/2);
       // ni more movement
       birdImage.display();
       batImage.display();
       avatarSpeed = 0;
       enemySpeed = 0;
    }
  }
