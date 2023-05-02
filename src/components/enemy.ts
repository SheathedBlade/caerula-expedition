export class Enemy {
  hits: number;
  sprite: any;

  constructor(numHits: number) {
    this.hits = numHits;
    this.sprite = 0;
  }

  addHits(num: number) {
    this.hits += num;
  }

  takeHit() {
    this.hits--;
  }

  getHits() {
    return this.hits;
  }
}

// Ring of bullets, 15 hits
export class Swarmcaller extends Enemy {
  constructor(numHits: number) {
    super(numHits);
  }
}

// Classic enemy, 5 hits
export class Drifter extends Enemy {
  constructor(numHits: number) {
    super(numHits);
  }
}

// Boss, hp sponge
export class Stella extends Enemy {
  constructor(numHits: number) {
    super(numHits);
  }
}

// Boss adds, 10 hits
export class Descendant extends Enemy {
  constructor(numHits: number) {
    super(numHits);
  }
}

// Slow, no bullets, homing onto player, 10 hits
// After first hit, dramatically speed up (change sprite as well?)
export class Reaper extends Enemy {
  constructor(numHits: number) {
    super(numHits);
  }
}

// Bomb upon death, 20 hits
export class Crawler extends Enemy {
  constructor(numHits: number) {
    super(numHits);
  }
}
