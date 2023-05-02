import p5 from "p5";
import Player from "./components/player";

const sketch = (p5: p5) => {
  let player: any;
  let score: number;

  p5.preload = () => {};

  p5.setup = () => {
    const canvas = p5.createCanvas(
      p5.windowWidth - p5.windowWidth / 4,
      p5.windowHeight
    );
    canvas.parent("#app");
    p5.ellipseMode(p5.CENTER);
    score = 0;

    player = new Player(p5, 3);
  };

  p5.draw = () => {
    p5.background(p5.color(18, 58, 112));

    // Update game entities
    player.update(p5);
    player.display(p5);

    // Score draw
    p5.textSize(20);
    p5.fill(p5.color(255));
    p5.text("Score: " + score, 20, 30);
  };

  p5.keyPressed = () => {
    // Space is pressed
    if (p5.keyCode == 32) {
    }
    // Spawn player bullet
  };
};

new p5(sketch);
