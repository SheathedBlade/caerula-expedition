import p5 from "p5";

export default class Player {
  position: any;
  speed: number;
  size: p5.Vector;
  lives: number;
  isInvincible: boolean;
  sprite: p5.Image[];
  imgIndex: number;
  spriteSpeed: number;
  spriteSize: p5.Vector;

  constructor(p5: p5, lives: number, sprite: p5.Image[]) {
    this.position = p5.createVector(p5.width / 8, p5.height / 2);
    this.speed = 5;
    this.size = p5.createVector(100, 60);
    this.lives = lives;
    this.isInvincible = false;
    this.sprite = sprite;
    this.imgIndex = 0;
    this.spriteSpeed = 0.8;
    this.spriteSize = p5.createVector(120, 120);
  }

  update(p5: p5) {
    this.checkKeyboardInput(p5);
    this.checkOutOfBounds(p5);
    this.imgIndex += this.spriteSpeed;
  }

  display(p5: p5) {
    let index = p5.floor(this.imgIndex) % this.sprite.length;
    p5.image(
      this.sprite[index],
      this.position.x,
      this.position.y - 10,
      this.spriteSize.x,
      this.spriteSize.y
    );
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
    if (this.position.x + this.size.x / 2 >= p5.width) {
      this.position.x = p5.width - this.size.x / 2;
    }
    // Check left side
    if (this.position.x - this.size.x / 2 <= 0) {
      this.position.x = this.size.x / 2;
    }
    // Check top
    if (this.position.y - this.size.y / 2 <= 0) {
      this.position.y = this.size.y / 2;
    }
    // Check bottom
    if (this.position.y + this.size.y / 2 >= p5.height) {
      this.position.y = p5.height - this.size.y / 2;
    }
  }
}
