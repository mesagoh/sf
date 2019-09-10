let flowers = [];
let numFlowers = 5;
let theta = 0;
let lightYellowOvary;
let pinkPetal;

function setup() {
  createCanvas(500, 500);
  initFlowers();
  lightYellowOvary = color(255,222,173);
  pinkPetal = color(255,240,245);
}


function draw() {
  background(220);

  for (var flo of flowers) {
    flo.render(sin(theta));
  }  
  theta += 0.05;
  
  printSignature();
}

function mousePressed() {
  for (var flo of flowers) {
    if (flo.ovaryColor === 255) {
      flo.ovaryColor = lightYellowOvary;
      flo.petalColor = pinkPetal;
    } else {
      flo.ovaryColor = 255;
      flo.petalColor = 255;
    }
  }

}

function initFlowers() {
  for (let i=0; i < numFlowers; i++) {
      flowers.push(new Flower());
  }
}

function printSignature() {
  push();
  translate(0, height);
  textSize(14);
  textStyle(ITALIC);
  fill(100);
  text('Made with <3 by ', 5, -5);
  fill(255,182,193);
  textStyle(BOLDITALIC);
  text('Melissa Goh ', 110, -5);
  fill(100);
  textStyle(ITALIC);
  text(', 2019 ', 195, -5);
  pop();
}


class Flower {
  constructor() {
    this.pos = createVector(random(10,400), random(10,400));
    this.dim = random(8,20);
    this.startAngle = random(1/6, 2);
    this.rotateAng = PI/4;
    this.ovaryColor = 255;
    this.petalColor = 255;
  }

  render(theta) {
    var petalW = this.dim + 3;
    var petalH = this.dim / 1.75;
    var adjust = this.dim * 0.9;

    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.startAngle);

    // draw petals
    fill(this.petalColor);
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


}
