var angleX = 0.0;
var angleY = 0.0;
function setup() {
  createCanvas(500,500,WEBGL);
}
function draw() {
  background(0);
  rotateY(angleY);
  fill(254,247,2);
  box(60);
  translate(50,0,50); // Translation in 3D!
  rotateX(angleX);
  box(30);
  angleX += 0.01;
  angleY -= 0.01;
  box(10);
  translate(30,0,30);
}
