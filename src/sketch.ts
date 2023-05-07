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

  // Enemy sprites
  let drifter: p5.Image;

  p5.preload = () => {
    drifter = p5.loadImage("/src/assets/drifter.gif");
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(
      p5.windowWidth - p5.windowWidth / 4,
      p5.windowHeight
    );
    p5.noCursor();
    canvas.parent("#app");
    p5.ellipseMode(p5.CENTER);
    p5.imageMode(p5.CENTER);
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

    for (let i = playerBullets.length - 1; i >= 0; i--) {
      if (!playerBullets[i].checkOutOfBounds(p5)) {
        playerBullets[i].update();
        playerBullets[i].display(p5);
      } else {
        playerBullets.splice(i, 1);
      }
    }

    // Check bullet collision with enemy
    for (let i = enemies.length - 1; i >= 0; i--) {
      for (let j = playerBullets.length - 1; j >= 0; j--) {
        let hit = enemies[i].checkBulletCollision(playerBullets[j]);
        if (hit) {
          playerBullets.splice(j, 1);
          enemies[i].takeHit();
          if (enemies[i].getHits() <= 0) {
            score += 100;
            enemies.splice(i, 1);
          }
          break;
        }
      }
    }

    enemies.forEach((enemy) => {
      enemy.update();
      enemy.display(p5);

      if (!player.isInvincible && enemy.checkPlayerCollision(player)) {
        console.log("I GOT HIT");
      }
    });

    if (p5.random(0, 100) < 1) {
      enemies.push(new Drifter(p5, 5, [], drifter));
    }

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
