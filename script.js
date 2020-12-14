const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

const iterations = 13;
let segmentsArray = [];

class Segment {
  constructor(length, x, y, angle) {
    this.angle = angle;
    this.length = length;
    this.height = Math.tanh(angle) * length / 2;
    this.dx = Math.cos(angle) * length;
    this.dy = Math.sin(angle) * length;
    this.pointA = [x, y];
    this.pointB = [x + this.dx, y + this.dy];
    this.color = '#fff';
  }
  divide() {
    let theta1 = this.angle - Math.PI / 4;
    let theta2 = this.angle - 3 * Math.PI / 4;
    let newLength = this.length * 0.5 / Math.cos(-Math.PI / 4);
    segmentsArray.push(new Segment(newLength, ...this.pointA, theta1));
    segmentsArray.push(new Segment(newLength, ...this.pointB, theta2));
  }
  draw() {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(...this.pointA);
    ctx.lineTo(...this.pointB);
    ctx.stroke();
  }
}

function drawCurve() {
  for (i = 0; i < segmentsArray.length; i++) {
    segmentsArray[i].draw();
  }
}

function constructCurve() {
  for (i = 0; i < iterations; i++) {
    let currentLength = segmentsArray.length;
    for (j = 0; j < currentLength; j++) {
      segmentsArray[0].divide();
      segmentsArray.shift();
    }
  }
}

function init() {
  segmentsArray.push(new Segment(150, canvas.width / 2, canvas.height / 2, 0));
  constructCurve();
  drawCurve();
}

init();
