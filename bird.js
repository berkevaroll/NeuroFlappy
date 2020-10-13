function Bird() {

    this.y = height / 2;
    this.x = 64;
    this.r = 32;
    this.maxSpeed = 15;
    this.minSpeed = -10;
    this.dead = false;
    this.gravity = 0.6;
    this.forceFly = -20;
    this.velocity = 0;
  
    this.show = function() {
      fill(255);
      ellipse(this.x, this.y, this.r, this.r);
      
  
    }
    this.fly = function() {
      if (this.velocity > 0) {
        this.velocity += this.forceFly;
      }
    }
    this.update = function() {
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