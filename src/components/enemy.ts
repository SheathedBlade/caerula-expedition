import p5 from "p5";
import { EnemyBullet, PlayerBullet } from "./bullet";
import Player from "./player";

export class Enemy {
  position: p5.Vector;
  speed: p5.Vector;
  size: p5.Vector;
  hits: number;
  sprite: p5.Image[];
  imgIndex: number;
  spriteSpeed: number;
  spriteSize: p5.Vector;

  constructor(
    p5: p5,
    numHits: number,
    speed: p5.Vector,
    size: p5.Vector,
    sprite: p5.Image[],
    spriteSpeed: number,
    spriteSize: p5.Vector
  ) {
    this.size = size;
    this.position = p5.createVector(
      p5.width + this.size.x,
      p5.random(this.size.y, p5.height - this.size.y / 2)
    );
    this.speed = speed;
    this.hits = numHits;
    this.sprite = sprite;
    this.imgIndex = 0;
    this.spriteSpeed = spriteSpeed;
    this.spriteSize = spriteSize;
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
    this.imgIndex += this.spriteSpeed;
  }

  display(p5: p5) {
    let index = p5.floor(this.imgIndex) % this.sprite.length;
    p5.image(
      this.sprite[index],
      this.position.x,
      this.position.y,
      this.spriteSize.x,
      this.spriteSize.y
    );
  }

  checkBulletCollision(bullet: PlayerBullet) {
    if (
      this.position.x - this.size.x / 2 <=
        bullet.getPosition().x + bullet.getSize() / 2 &&
      this.position.x + this.size.x / 2 >=
        bullet.getPosition().x - bullet.getSize() / 2 &&
      this.position.y - this.size.y / 2 <=
        bullet.getPosition().y + bullet.getSize() / 2 &&
      this.position.y + this.size.y / 2 >=
        bullet.getPosition().y - bullet.getSize() / 2
    )
      return true;
    return false;
  }

  checkPlayerCollision(player: Player) {
    if (
      this.position.x - this.size.x / 2 <=
        player.getPosition().x + player.getSize().x / 2 &&
      this.position.x + this.size.x / 2 >=
        player.getPosition().x - player.getSize().x / 2 &&
      this.position.y - this.size.y / 2 <=
        player.getPosition().y + player.getSize().y / 2 &&
      this.position.y + this.size.y / 2 >=
        player.getPosition().y - player.getSize().y / 2
    )
      return true;
    return false;
  }
}

// Classic enemy, 5 hits
export class Drifter extends Enemy {
  bullets: EnemyBullet[] | undefined;
  constructor(
    p5: p5,
    numHits: number,
    sprite: p5.Image[],
    bullets?: EnemyBullet[]
  ) {
    super(
      p5,
      numHits,
      p5.createVector(1, 0),
      p5.createVector(170, 50),
      sprite,
      0.6,
      p5.createVector(200, 200)
    );
    this.bullets = bullets;
  }
}

// Ring of bullets, 15 hits
export class Swarmcaller extends Enemy {
  bullets: EnemyBullet[] | undefined;
  constructor(
    p5: p5,
    numHits: number,
    sprite: p5.Image[],
    bullets?: EnemyBullet[]
  ) {
    super(
      p5,
      numHits,
      p5.createVector(0.5, 0),
      p5.createVector(120, 120),
      sprite,
      0.8,
      p5.createVector(120, 120)
    );
    this.bullets = bullets;
  }
}

// Explode upon death, 20 hits
// Have additional bounding circle for AOE dmg
export class Crawler extends Enemy {
  constructor(p5: p5, numHits: number, sprite: p5.Image[]) {
    super(
      p5,
      numHits,
      p5.createVector(0.2, 0),
      p5.createVector(120, 120),
      sprite,
      0.6,
      p5.createVector(120, 120)
    );
  }
}

// Boss, 100 hits, stationary, occasionally shoots large projectile
// Buffs all other enemies' hp
// Spawns descendants while alive
export class Stella extends Enemy {
  bullets: EnemyBullet[] | undefined;
  constructor(
    p5: p5,
    numHits: number,
    sprite: p5.Image[],
    bullets?: EnemyBullet[]
  ) {
    super(
      p5,
      numHits,
      p5.createVector(0.5, 0),
      p5.createVector(300, 300),
      sprite,
      0.8,
      p5.createVector(500, 500)
    );
    this.bullets = bullets;
  }
}

// Boss adds, 3 hits, just there to block enemies, gives low amount of points
export class Descendant extends Enemy {
  constructor(p5: p5, numHits: number, sprite: p5.Image[]) {
    super(
      p5,
      numHits,
      p5.createVector(0.9, 0),
      p5.createVector(80, 80),
      sprite,
      0.8,
      p5.createVector(80, 80)
    );
  }
}

// // Slow, no bullets, homing onto player, 10 hits
// // After first hit, dramatically speed up
// export class Reaper extends Enemy {
//   constructor(numHits: number) {
//     super(numHits);
//   }
// }
