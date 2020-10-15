function nextGeneration(){

    calFitness();

    for(let i=0;i<TOTAL_PLAYER; i++){
        birds[i] = pickBest();
    }
    savedBirds = [];
    genCount++;
}

function calFitness(){

    let sum = 0;
    for(let bird of savedBirds){
        sum += bird.score;
    }
    for(let bird of savedBirds){
        bird.fitness = bird.score / sum;
    }
}

function pickBest(){
    var index = 0;
    var r =random(1);

    while(r>0){
        r = r-savedBirds[index].fitness;
        index++;
    }
    index--;
    let bird = savedBirds[index];
    let child = new Bird(bird.brain);
    child.mutate();
    return child;
}