/* Nice pastel color palette:
  https://www.rapidtables.com/web/color/white-color.html

  lightYellowOvary = color(255,222,173);
  pinkPetal = color(255,240,245);
*/

let flowers = [];   // array of Flower objects
let numFlowers;
let theta = 0;

let palettes = [];    // array of Palette objects
let paletteNow;
let paddlePopPallete;
let colorfulKuehPallete;

let bgCol;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initPalettes();
  reset(windowWidth, windowHeight);
}

function draw() {
  //bgCol = mouseX/7;
  background(0);
  checkDeath();
  drawFlowers();

  theta += 0.05;
  printSignature();
}

function checkDeath(i) {
  for (let i=0; i<flowers.length; i++) {
    if (flowers[i].countToDeath <= 0) {
      flowers.splice(i, 1);
    }
  }
}

function drawFlowers() {
  for (var f of flowers) {
    f.render(sin(theta));
  } 
}

function mouseClicked() {
  for (var f of flowers) {
    f.update(mouseX, mouseY);
  }

}

function initFlowers(w, h) {
  numFlowers = max(w, h) / min(w, h) * 10;

  for (let i=0; i < numFlowers; i++) {
      flowers.push(new Flower());
  }
}


function initPalettes() {
  //mint, salmon, lavendar
  paddlePopPallete = {
    ovary: color(252,226,174),
    petal: [color(182,255,234), color(255,179,179), color(255,220,247)]
  }

  //pink, pastel yellow, pastel green
  colorfulKuehPallete = {
    ovary: color(248,87,181),
    petal: [color(247,129,188), color(253,255,220), color(197,236,190)]
  }

  palettes.push(new Palette(paddlePopPallete.ovary, paddlePopPallete.petal));
  palettes.push(new Palette(colorfulKuehPallete.ovary, colorfulKuehPallete.petal));
}

function reset(w, h) {
  initFlowers(w, h);
  pickPalette();
}

function pickPalette() {
  paletteNow = random(palettes);
  console.log(paletteNow);
}

function printSignature() {
  push();
  translate(0, height);
  textSize(15);
  textStyle(ITALIC);
  fill(100);
  text('Made with <3 by ', 5, -5);
  fill(255,182,193);
  textStyle(BOLDITALIC);
  text('Melissa Goh ', 120, -5);
  fill(100);
  textStyle(ITALIC);
  text(', 2019 ', 210, -5);
  pop();
}


class Flower {
  constructor() {
    this.pos = createVector(random(10,windowWidth-10), random(10,windowHeight-10));
    this.dim = random(8,20);
    this.startAngle = random(1/6, 2);
    this.rotateAng = PI/4;
    this.ovaryColor = 255;
    this.petalColor = 255;
    this.countToDeath = random(3, 10);
  }

  render(theta) {
    var petalW = this.dim + 3;
    var petalH = this.dim / 1.75;
    var adjust = this.dim * 0.9;

    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.startAngle);

    // draw petals
    stroke(this.petalColor);
    strokeWeight(2);
    noFill();

     for (let i = 0; i < 8; i++) {
       push();
       rotate(this.rotateAng + theta);
       ellipse(-adjust, 0, petalW, petalH);
       this.rotateAng += PI/3;
       pop();
     }

    // then draw ovary
    fill(this.ovaryColor);
    circle(0, 0, this.dim);
    pop();

  }

  update(x, y) {
    if (this.flowerSelected(x, y)) {
      this.ovaryColor = paletteNow.ovary;
      this.petalColor = random(paletteNow.petal);
      this.countToDeath -= 1;
      this.dim += 2;
    }
  }

  flowerSelected(x, y) {
    var d = dist(this.pos.x, this.pos.y, x, y);

    // TODO: return if statement after done debugging
    return (d < (this.dim/2));
  }
}

class Palette {
  constructor(o, p) {
    this.ovary = o;
    this.petal = p;
  }
}
