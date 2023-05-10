export default class Timer {
  maxTime: number;
  currTime: number;
  constructor(totalSeconds: number) {
    this.maxTime = totalSeconds;
    this.currTime = 0;
  }
  countUp() {
    if (this.currTime < this.maxTime) this.currTime++;
  }
  getCurrentTime() {
    return this.currTime;
  }
  getMaxTime() {
    return this.maxTime;
  }

  setCurrentTime(newTime: number) {
    this.currTime = newTime;
  }
  setMaxTime(newTime: number) {
    this.maxTime = newTime;
  }
}
