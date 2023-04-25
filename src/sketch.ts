import P5 from "p5";

const sketch = (p5: P5) => {
  p5.preload = () => {};
  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.parent("#app");
  };

  p5.draw = () => {
    p5.background(p5.color(220));
  };
};

new P5(sketch);
