import p5 from "p5";
import "p5/lib/addons/p5.sound";
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

let finalScore: number = 0;
let gameComplete: boolean = false;
// let scoreSubmitted: boolean = false;

const sketch = (p5: p5) => {
  let player: Player;
  let score: number;
  let playerBullets: PlayerBullet[];
  let enemies: Enemy[];

  // Game states
  let intro: boolean = true;
  let game: boolean = false;
  let end: boolean = false;

  // Timers
  let invincibleTimer: Timer;
  // let powerUpTimer: Timer;

  // Sounds
  let bgm: any;

  // Fonts
  let starsight: p5.Font;
  let ddd: p5.Font;

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
  let boss: Stella;
  let bossSpawned: boolean = false;
  let crawler: p5.Image[] = [];

  p5.preload = () => {
    // Load sounds
    p5.soundFormats("mp3");
    bgm = p5.loadSound("./sounds/caerula.mp3");

    // Load fonts
    starsight = p5.loadFont("./fonts/Starsight.otf");
    ddd = p5.loadFont("./fonts/doomsdaysdragons.otf");

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
    canvas.parent("#app");
    canvas.mouseClicked(clickInsideCanvas);
    p5.ellipseMode(p5.CENTER);
    p5.rectMode(p5.CENTER);
    p5.imageMode(p5.CENTER);

    resetGame();
  };

  function resetGame() {
    invincibleTimer = new Timer(3);
    player = new Player(p5, 3, playerSprite);
    playerBullets = [];
    enemies = [];
    score = 0;
    boss = new Stella(p5, 100, stella, []);
    gameComplete = false;
    // scoreSubmitted = false;
  }

  function updateScene() {
    if (intro) showIntro();
    else if (game) showGame();
    else if (end) showEnd();
  }

  p5.draw = () => {
    p5.background(10, 20, 30);
    updateScene();
  };

  function clickInsideCanvas() {
    if (intro) {
      intro = false;
      game = true;
    } else if (end) {
      end = false;
      intro = true;
      resetGame();
    }
  }

  p5.keyPressed = () => {
    if (game) {
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
    }
  };

  function showIntro() {
    p5.textFont(starsight);
    p5.fill(p5.color(255));
    p5.textSize(50);

    p5.cursor;
    p5.text("BUY", p5.width / 2, p5.height / 2);

    if (!gameComplete) {
      disableScoreForm();
    }
  }

  function showGame() {
    p5.noCursor();
    // play bgm
    if (!bgm.isPlaying()) {
      bgm.setVolume(0.4);
      bgm.play();
    }

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

    // Check game state
    if (
      player.getLives() <= 0 ||
      Math.floor(bgm.currentTime()) >= bgm.duration()
    ) {
      game = false;
      end = true;
    }

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
      enemy.update(p5);
      enemy.display(p5);

      if (enemy.checkOutOfBounds()) {
        enemies.splice(enemies.indexOf(enemy), 1);
      }

      if (!player.isInvincible && enemy.checkPlayerCollision(player)) {
        player.isInvincible = true;
        player.loseLife();
      }
    });

    if (p5.random(0, 100) < 1) {
      enemies.push(new Drifter(p5, 5, drifter, []));
    }

    if (p5.random(0, 500) < 1) {
      enemies.push(new Swarmcaller(p5, 15, swarmcaller, []));
    }

    if (!bossSpawned && Math.floor(bgm.currentTime()) == 202) {
      enemies.push(boss);
      bossSpawned = true;
    }
    if (bossSpawned && p5.random(0, 100) < 1) {
      enemies.push(new Descendant(p5, 3, descendant));
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
    p5.text("TIME: " + Math.floor(bgm.currentTime()), p5.width - 15, 80);

    p5.textAlign(p5.LEFT);
    p5.text("LIVES: " + player.getLives(), 15, 40);
  }

  function showEnd() {
    gameComplete = true;
    p5.cursor();
    p5.background(p5.color(0, 10, 20));
    if (bgm.isPlaying()) bgm.stop();
    p5.textAlign(p5.CENTER);
    p5.textFont(ddd);
    p5.textSize(60);
    p5.text(
      "You have reached the end of the expedition.",
      p5.width / 2,
      p5.height / 8,
      p5.width / 2
    );

    p5.textFont(starsight);
    finalScore = score;
    if (gameComplete) {
      enableScoreForm();
      gameComplete = false;
    }
    p5.text("Your score: " + score, p5.width / 2, p5.height / 2);
    p5.textSize(40);
    p5.text(
      "To record your score, submit your name on the right banner.",
      p5.width / 2,
      p5.height / 2 + p5.height / 8,
      p5.width / 2
    );
    p5.text("Click to play again.", p5.width / 2, p5.height - p5.height / 8);
  }
};

new p5(sketch);

function enableScoreForm() {
  const form: HTMLElement | null = document.getElementById("form");
  if (form != null) {
    form.style.display = "flex";
  }
  let scoreTag: HTMLElement | null = document.getElementById("score");
  if (scoreTag != null) {
    scoreTag.innerHTML = "Your final score is: " + finalScore;
  }
  const hiddenForm: HTMLElement | null = document.getElementById("hiddenForm");
  if (hiddenForm != null) {
    hiddenForm.style.display = "none";
  }
}

function disableScoreForm() {
  const hiddenForm: HTMLElement | null = document.getElementById("hiddenForm");
  if (hiddenForm != null) {
    hiddenForm.style.display = "flex";
  }
  const form: HTMLElement | null = document.getElementById("form");
  if (form != null) {
    form.style.display = "none";
  }
}

// const rankingBody: HTMLTableSectionElement | null =
//   document.querySelector("#rankings > tbody");
// const baseURL: string = "http://localhost:5173/message";

// async function loadRankings(e: any) {
//   e.preventDefault();
//   const res = await fetch(baseURL, {
//     method: "GET",
//   });
//   console.log(res);
//   const data = await res.json();
//   console.log(data);
//   // try {
//   //   const res = await showTop5();
//   //   console.log(res);
//   // } catch (e) {
//   //   console.log(e);
//   // }
// }

// function populateBoard(data: any) {
//   data.forEach((row: any) => {
//     const tr = document.createElement("tr");
//     row.forEach((cell: any) => {
//       const td = document.createElement("td");
//       td.textContent = cell;
//       tr.appendChild(td);
//     });
//     rankingBody?.appendChild(tr);
//   });
//   console.log(data);
// }

// document.addEventListener("DOMContentLoaded", () => {
//   loadRankings();
// });

// const submitBtn: HTMLElement | null = document.getElementById("submit");
// submitBtn?.addEventListener("click", loadRankings);
