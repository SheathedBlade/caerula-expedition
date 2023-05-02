import p5 from "p5";
import Player from "./components/player";

const sketch = (p5: p5) => {
  let player: any;
  let score: number;

  p5.preload = () => {};
  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.parent("#app");
    p5.ellipseMode(p5.CENTER);
    score = 0;

    player = new Player(p5, 3);
  };

  p5.draw = () => {
    p5.background(p5.color(220));
    player.update(p5);
    player.display(p5);
    p5.text("Score: " + score, p5.width / 2, 20);
  };
};

new p5(sketch);
