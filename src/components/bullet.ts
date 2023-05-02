import p5 from "p5";
import { Enemy } from "./enemy";
import Player from "./player";

export class Bullet {
  position: p5.Vector;
  size: number;
  speed: p5.Vector;

  constructor(p5: p5, size: number, entity: Player | Enemy, speed: p5.Vector) {
    this.size = size;
    this.speed = speed;
    this.position = p5.createVector(
      entity.getPosition().x + entity.getSize() / 2,
      entity.getPosition().y
    );
  }
  update() {
    this.position.add(this.speed);
  }
  display(p5: p5) {
    p5.fill(p5.color(255));
    p5.noStroke();
    p5.ellipse(this.position.x, this.position.y, this.size);
  }
  getSize(): number {
    return this.size;
  }
  checkOutOfBounds(p5: p5) {
    if (
      this.position.x - this.size / 2 >= p5.width ||
      this.position.x + this.size / 2 < 0 ||
      this.position.y - this.size / 2 < 0 ||
      this.position.y + this.size / 2 >= p5.height
    )
      return true;
    return false;
  }
  checkBulletCollision() {}
}

export class PlayerBullet extends Bullet {
  constructor(p5: p5, size: number, player: Player, speed: p5.Vector) {
    super(p5, size, player, speed);
  }

  checkEnemyCollision() {}
}

export class EnemyBullet extends Bullet {
  constructor(p5: p5, size: number, enemy: Enemy, speed: p5.Vector) {
    super(p5, size, enemy, speed);
  }

  checkPlayerCollision(player: Player) {
    if (
      this.position.x - this.size / 2 ==
      player.getPosition().x + player.getSize() / 2
    )
      return true;
    return false;
  }
}
