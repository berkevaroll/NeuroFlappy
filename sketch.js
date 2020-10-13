const PIPE_RATE = 120;
var bird;
var pipes = [];
let score;
var button;
var scoretext;
let dead;

function setup() {
  dead = false;
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
  score = 0;
}

function draw() {
  background(150, 150, 150);
  bird.update();
  bird.show();
  if (frameCount % PIPE_RATE == 0) {
    pipes.push(new Pipe());
  }
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].update();
    pipes[i].show();


    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
      score++;
    }
    if (pipes[i].coll(bird)) {
      pipes = [];
      deathScreen();
      dead =true;

    }

  }
  textAlign(CENTER);
  if (!dead) {
    scoretext = text('Score:' + score, 30, 50);
  }
}
for (let i = 0; i < pipes.length; i++) {
  if (pipes[i].pass(bird)) {
    score++;
  }
}

function deathScreen() {

  background(255, 150, 0);
  noLoop();

  button = createButton('Restart!');
  button.position(width / 2 - 30, height / 2 + 40);
  button.mousePressed(resetSketch);
  textAlign(CENTER);
  text('YOU DEAD!', width / 2, height / 2);
  textAlign(CENTER);
  text('Your Score:' + score, width / 2, height / 2 + 20);
  score = 0;
}

function resetSketch() {
  button.remove();
  frameCount = 0;
  loop();
  setup();
}

function keyPressed() {
  if (key == 'f') {
    bird.fly();
  }
}