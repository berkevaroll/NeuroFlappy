function Bird(brain) {

  this.mutate = function(x){     
    if (random(1) < 0.1) {
      let offset = randomGaussian() * 0.5;
      let newx = x + offset;
      return newx;
    } else {
      return x;
    }
}
    this.gameScore = 0;
    this.y = height / 2;
    this.x = 64;
    this.r = 32;
    this.maxSpeed = 15;
    this.minSpeed = -10;
    this.dead = false;
    this.gravity = 0.6;
    this.forceFly = -20;
    this.velocity = 0;
    this.score = 0;
    this.fittness = 0;
    if(brain){
      this.brain = brain.copy();
      this.brain.mutate(mutate);
    }else{
      this.brain = new NeuralNetwork(4,4,2);
    }

    this.think = function(pipes){

      let closest = null;
      let distance = Infinity;
      for(let i =0;i<pipes.length;i++){

        let d = pipes[i].x - this.x;
        if(d < distance && d>0){
          closest = pipes[i];
          distance = d;
        }
      }

      let inputs = [];
      inputs = [this.y/height, closest.top/height, (height-closest.bottom)/height, this.x/width];
      let output = this.brain.predict(inputs);
      if(output[0] > output[1]){
        this.fly();
      }
    }
    this.show = function() {
      stroke(0);
      fill(220,100);
      ellipse(this.x, this.y, this.r, this.r);
      
  
    }
    this.fly = function() {
      if (this.velocity > 0) {
        this.velocity += this.forceFly;
      }
    }
    this.update = function() {

      this.score++;
      this.velocity += this.gravity;
      if(this.velocity < this.minSpeed){
        this.velocity = this.minSpeed;
      }
      if(this.velocity > this.maxSpeed){
        this.velocity = this.maxSpeed;
      }
      this.y += this.velocity;
  
      if (this.y > height - 16) {
        this.y = height - 16;
        this.velocity = 0;
      }
      if (this.y < 0) {
        this.y = 0;
        this.velocity = 0;
      }
    }
  
  }