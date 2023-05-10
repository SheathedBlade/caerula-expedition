import p5 from "p5";
import { PlayerBullet } from "./components/bullet";
import {
  Crawler,
  Descendant,
  Drifter,
  Enemy,
  Stella,
  Swarmcaller,
} from "./components/enemy";
import Player from "./components/player";
import Timer from "./components/timer";

const sketch = (p5: p5) => {
  let player: Player;
  let score: number;
  let playerBullets: PlayerBullet[];
  let enemies: Enemy[];

  // Timers
  let invincibleTimer: Timer;
  // let powerUpTimer: Timer;

  // Sounds
  let bgm: any;

  // Fonts
  let starsight: p5.Font;

  // Background image
  let bgImage: p5.Image[] = [];
  let bgIndex: number = 0;
  let bgSpeed: number = 0.8;

  // Player sprite
  let playerSprite: p5.Image[] = [];

  // Enemy sprites
  let drifter: p5.Image[] = [];
  // let reaper: p5.Image[] = [];
  let swarmcaller: p5.Image[] = [];
  let descendant: p5.Image[] = [];
  let stella: p5.Image[] = [];
  let crawler: p5.Image[] = [];

  p5.preload = () => {
    // Load sounds
    p5.soundFormats("mp3");
    bgm = p5.loadSound("./sounds/caerula.mp3");

    // Load fonts
    starsight = p5.loadFont("./fonts/Starsight.otf");

    // Load bgImage
    for (let i = 1; i <= 228; i++) {
      bgImage.push(p5.loadImage("./background-anim/background" + i + ".png"));
    }

    // Load sprite frames
    for (let i = 1; i <= 31; i++) {
      drifter.push(p5.loadImage("./drifter-anim/drifter" + i + ".png"));
      swarmcaller.push(
        p5.loadImage("./swarmcaller-anim/swarmcaller" + i + ".png")
      );
    }

    for (let i = 1; i <= 42; i++) {
      playerSprite.push(p5.loadImage("./player-anim/player" + i + ".png"));
      descendant.push(
        p5.loadImage("./descendant-anim/descendant" + i + ".png")
      );
    }

    for (let i = 1; i <= 64; i++) {
      stella.push(p5.loadImage("./stella-anim/stella" + i + ".png"));
    }

    for (let i = 1; i <= 10; i++) {
      crawler.push(p5.loadImage("./crawler-anim/crawler" + i + ".png"));
    }
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(
      p5.windowWidth - p5.windowWidth / 4,
      p5.windowHeight
    );
    p5.noCursor();
    canvas.parent("#app");
    p5.ellipseMode(p5.CENTER);
    p5.rectMode(p5.CENTER);
    p5.imageMode(p5.CENTER);
    score = 0;

    invincibleTimer = new Timer(3);

    p5.textFont(starsight);

    player = new Player(p5, 3, playerSprite);
    playerBullets = [];
    enemies = [];
    bgm.setVolume(0.4);
    if (!bgm.isPlaying()) bgm.play();
  };

  p5.draw = () => {
    // Show background gif
    bgIndex += bgSpeed;
    let _bgIndex = p5.floor(bgIndex) % bgImage.length;
    p5.image(
      bgImage[_bgIndex],
      p5.width / 2,
      p5.height / 2,
      (bgImage[_bgIndex].width * p5.height) / bgImage[_bgIndex].height,
      p5.height
    );

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
        player.isInvincible = true;
        player.loseLife();
      }
    });

    if (p5.random(0, 100) < 1) {
      enemies.push(new Drifter(p5, 5, drifter, []));
      enemies.push(new Descendant(p5, 3, descendant));
    }

    if (p5.random(0, 500) < 1) {
      enemies.push(new Swarmcaller(p5, 15, swarmcaller, []));
    }

    if (p5.random(0, 1000) < 1) {
      enemies.push(new Stella(p5, 100, stella, []));
    }

    if (p5.random(0, 700) < 1) {
      enemies.push(new Crawler(p5, 20, crawler));
    }

    // invincible timer
    if (p5.frameCount % 60 === 0 && player.isInvincible) {
      invincibleTimer.countUp();
    }

    // Check if invincible timer runs out
    if (
      player.isInvincible &&
      invincibleTimer.getCurrentTime() >= invincibleTimer.getMaxTime()
    ) {
      player.isInvincible = false;
      invincibleTimer.setCurrentTime(0);
    }

    // Score draw
    p5.fill(p5.color(0, 80));
    p5.noStroke();
    p5.rect(p5.width / 2, 25, p5.width, 50);

    p5.textSize(40);
    p5.fill(p5.color(255));
    p5.textAlign(p5.RIGHT);
    p5.text("SCORE: " + score, p5.width - 15, 40);
    p5.text("TIME: " + invincibleTimer.getCurrentTime(), p5.width - 15, 80);

    p5.textAlign(p5.LEFT);
    p5.text("LIVES: " + player.getLives(), 15, 40);
  };

  p5.keyPressed = () => {
    // Space is pressed, spawn player bullet
    if (p5.keyCode == 32) {
      // If powered up by rapid fire
      if (player.rapidFire) {
        playerBullets.push(
          new PlayerBullet(p5, 10, player, p5.createVector(20, 0))
        );
        playerBullets.push(
          new PlayerBullet(p5, 10, player, p5.createVector(17, 0))
        );
      } else {
        playerBullets.push(
          new PlayerBullet(p5, 10, player, p5.createVector(10, 0))
        );
      }
    }
  };
};

new p5(sketch);
