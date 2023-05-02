export default class Bullet {
  size: number;
  constructor(size: number) {
    this.size = size;
  }
  update() {}
  display() {}
  getSize(): number {
    return this.size;
  }
}
