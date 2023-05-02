import p5 from "p5";
import { PlayerBullet } from "./components/bullet";
import { Drifter, Enemy } from "./components/enemy";
import Player from "./components/player";
import Timer from "./components/timer";

const sketch = (p5: p5) => {
  let player: Player;
  let score: number;
  let playerBullets: PlayerBullet[];
  let timer: Timer;
  let enemies: Enemy[];

  p5.preload = () => {};

  p5.setup = () => {
    const canvas = p5.createCanvas(
      p5.windowWidth - p5.windowWidth / 4,
      p5.windowHeight
    );
    p5.noCursor();
    canvas.parent("#app");
    p5.ellipseMode(p5.CENTER);
    score = 0;
    timer = new Timer(100);

    player = new Player(p5, 3);
    playerBullets = [];
    enemies = [];
  };

  p5.draw = () => {
    p5.background(p5.color(18, 58, 112));

    // Update game entities
    player.update(p5);
    player.display(p5);

    playerBullets.forEach((bullet) => {
      if (!bullet.checkOutOfBounds(p5)) {
        bullet.update();
        bullet.display(p5);
      } else {
        playerBullets.splice(playerBullets.indexOf(bullet), 1);
      }
    });

    enemies.forEach((enemy) => {
      enemy.update();
      enemy.display(p5);
    });

    if (p5.random(0, 100) < 1) enemies.push(new Drifter(p5, 20, []));

    // Count up timer
    if (
      p5.frameCount % 60 === 0 &&
      timer.getCurrentTime() < timer.getMaxTime()
    ) {
      timer.countUp();
    }

    // Score draw
    p5.textSize(20);
    p5.fill(p5.color(255));
    p5.text("Score: " + score, 20, 30);

    p5.text("TIME: " + timer.getCurrentTime(), 20, 60);
  };

  p5.keyPressed = () => {
    // Space is pressed, spawn player bullet
    if (p5.keyCode == 32) {
      playerBullets.push(
        new PlayerBullet(p5, 10, player, p5.createVector(10, 0))
      );
    }
  };
};

new p5(sketch);
