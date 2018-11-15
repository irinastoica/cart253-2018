class Paddle {
  constructor() {
    this.width = 100
    this. height = 25
    this.color = color(255)
    this.location = createVector ((width / 2) - (this.width / 2), height - 30)

  }

  display() {
    fill(255)
    rect(this.location.x, this.location.y, this.width, this.height)
  }
}
