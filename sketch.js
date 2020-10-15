const PIPE_RATE = 120;
const TOTAL_PLAYER = 500;
var counter = 0;
var birds = [];
var savedBirds = [];
var pipes = [];
var button;
var scoretext;
var gentext;
let dead;
let genCount = 0;
let bestScore =0;
let slider;
function setup() {
  dead = false;
  createCanvas(400, 600);
  slider = createSlider(1, 100, 1);
  for(let i =0; i<TOTAL_PLAYER;i++)
  {
    birds[i] = new Bird();
  }
}

function draw() {
 
for(let c =0;c<slider.value();c++){

    if (counter % PIPE_RATE == 0) {
      pipes.push(new Pipe());
    }
    counter++;
    

    for (let i = 0; i < pipes.length; i++) {
      pipes[i].update();


      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
        for(let bird of birds){
          bird.gameScore++;
        }
      }
      for(let j = birds.length -1; j>=0; j--){
        if (pipes[i].coll(birds[j])) {
    
          savedBirds.push(birds.splice(j,1));
    
          //  deathScreen();
          //    dead =true;
        
            }
      }
      

    }
    for(let bird of birds)
    {
      bird.think(pipes);
      bird.update();
    }
    if(birds.length === 0){
      counter = 0;
      nextGeneration();
      pipes= [];
    }

    for(let i = birds.length-1;i>=0;i--){
      if(birds[i].gameScore > bestScore)bestScore = birds[i].gameScore;
    }
}
  
  textAlign(CENTER);
  
  
  if (!dead) {
    //scoretext = text('Score:' + score, 30, 50);
    scoretext = text('Score:' + bestScore, 80, height -50);
    gentext = text('Generation:' + genCount,70, 50);
  }

  background(150, 150, 150);
  for(let bird of birds){
    bird.show();
  }
  for(let pipe of pipes){
    pipe.show();
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
  text('Your Score:' + bestScore, width / 2, height / 2 + 20);
}

function resetSketch() {
  button.remove();
  frameCount = 0;
  loop();
  setup();
}

// function keyPressed() {
//   if (key == 'f') {
//     bird.fly();
//   }
// }