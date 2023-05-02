export class Powerup {
  duration: number;
  sprite: any;

  constructor(dur: number, sprite: any) {
    this.duration = dur;
    this.sprite = sprite;
  }
}

export class TriBullet extends Powerup {}

export class RapidFire extends Powerup {}

export class Railgun extends Powerup {}
