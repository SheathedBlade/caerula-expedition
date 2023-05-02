export class Bullet {
  size: number;
  fireRate: number;
  constructor(size: number, fireRate: number) {
    this.size = size;
    this.fireRate = fireRate;
  }
  update() {}
  display() {}
  getSize(): number {
    return this.size;
  }
}

export class PlayerBullet extends Bullet {
  powerUpDuration: number;

  constructor(size: number, fireRate: number, powerUpDur: number) {
    super(size, fireRate);
    this.powerUpDuration = powerUpDur;
  }
}

export class EnemyBullet extends Bullet {}
