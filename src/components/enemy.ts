import p5 from "p5";
import { EnemyBullet, PlayerBullet } from "./bullet";
import Player from "./player";

export class Enemy {
  position: p5.Vector;
  speed: p5.Vector;
  size: number;
  hits: number;
  sprite: any;

  constructor(
    p5: p5,
    numHits: number,
    speed: p5.Vector,
    size: number,
    sprite?: p5.Image
  ) {
    this.size = size;
    this.position = p5.createVector(
      p5.width + this.size / 2,
      p5.random(this.size / 2, p5.height - this.size / 2)
    );
    this.speed = speed;
    this.hits = numHits;
    this.sprite = sprite;
  }

  addHits(num: number) {
    this.hits += num;
  }

  takeHit(): number | void {
    this.hits--;
    console.log("ENEMY: " + this.hits);
  }

  getHits() {
    return this.hits;
  }

  getPosition() {
    return this.position;
  }

  getSize() {
    return this.size;
  }

  update() {
    this.position.x -= this.speed.x;
  }

  display(p5: p5) {
    p5.fill(p5.color(20, 240, 60));
    p5.noStroke();
    p5.ellipseMode(p5.CENTER);
    p5.ellipse(this.position.x, this.position.y, this.size);
  }

  checkBulletCollision(bullet: PlayerBullet) {
    if (
      this.position.x - this.size / 2 <=
        bullet.getPosition().x + bullet.getSize() / 2 &&
      this.position.y - this.size / 2 <=
        bullet.getPosition().y + bullet.getSize() / 2 &&
      this.position.y + this.size / 2 >=
        bullet.getPosition().y - bullet.getSize() / 2
    )
      return true;
    return false;
  }

  checkPlayerCollision(player: Player) {
    if (
      this.position.x - this.size / 2 <=
        player.getPosition().x + player.getSize() / 2 &&
      this.position.y - this.size / 2 <=
        player.getPosition().y + player.getSize() / 2 &&
      this.position.y + this.size / 2 >=
        player.getPosition().y - player.getSize() / 2
    )
      return true;
    return false;
  }
}

// // Ring of bullets, 15 hits
// export class Swarmcaller extends Enemy {
//   constructor(numHits: number) {
//     super(numHits);
//   }
// }

// Classic enemy, 5 hits
export class Drifter extends Enemy {
  bullets: EnemyBullet[] | undefined;
  constructor(p5: p5, numHits: number, bullets?: EnemyBullet[], sprite?: any) {
    super(p5, numHits, p5.createVector(1, 0), 50, sprite);
    this.bullets = bullets;
  }

  // override update(): void {

  // }
}

// // Boss, hp sponge
// export class Stella extends Enemy {
//   constructor(numHits: number) {
//     super(numHits);
//   }
// }

// // Boss adds, 10 hits
// export class Descendant extends Enemy {
//   constructor(numHits: number) {
//     super(numHits);
//   }
// }

// // Slow, no bullets, homing onto player, 10 hits
// // After first hit, dramatically speed up
// export class Reaper extends Enemy {
//   constructor(numHits: number) {
//     super(numHits);
//   }
// }

// // Explode upon death, 20 hits
// // Have additional bounding circle for AOE dmg
// export class Crawler extends Enemy {
//   constructor(numHits: number) {
//     super(numHits);
//   }
// }
