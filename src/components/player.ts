import p5 from "p5";

export default class Player {
  position: any;
  speed: number;
  size: number;
  lives: number;

  constructor(p5: p5, lives: number) {
    this.position = p5.createVector(p5.width / 8, p5.height / 2);
    this.speed = 8;
    this.size = 50;
    this.lives = lives;
  }

  update(p5: p5) {
    this.checkKeyboardInput(p5);
    this.checkOutOfBounds(p5);
  }

  display(p5: p5) {
    p5.fill(p5.color(125, 26, 29));
    p5.noStroke;
    p5.circle(this.position.x, this.position.y, this.size);
  }

  getPosition() {
    return this.position;
  }

  getSize() {
    return this.size;
  }

  checkKeyboardInput(p5: p5) {
    // Check for W key or Up Arrow
    if (p5.keyIsDown(87) || p5.keyIsDown(p5.UP_ARROW))
      this.position.y -= this.speed;

    // Check A or Left arrow
    if (p5.keyIsDown(65) || p5.keyIsDown(p5.LEFT_ARROW))
      this.position.x -= this.speed;

    // Check S or down arrow
    if (p5.keyIsDown(83) || p5.keyIsDown(p5.DOWN_ARROW))
      this.position.y += this.speed;

    // Check D or right arrow
    if (p5.keyIsDown(68) || p5.keyIsDown(p5.RIGHT_ARROW))
      this.position.x += this.speed;
  }

  checkOutOfBounds(p5: p5) {
    // Check right side of screen
    if (this.position.x + this.size / 2 >= p5.width) {
      this.position.x = p5.width - this.size / 2;
    }
    // Check left side
    if (this.position.x - this.size / 2 <= 0) {
      this.position.x = this.size / 2;
    }
    // Check top
    if (this.position.y - this.size / 2 <= 0) {
      this.position.y = this.size / 2;
    }
    // Check bottom
    if (this.position.y + this.size / 2 >= p5.height) {
      this.position.y = p5.height - this.size / 2;
    }
  }
}
