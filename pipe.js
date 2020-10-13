function Pipe(){
  
    this.gap = 120;
    this.minLen = 20;
    this.top = this.minLen + random(height - (2* this.minLen) - this.gap);
    this.bottom = height - (this.top + this.gap);
    this.x = width;
    this.w = 20;
    this.speed = 2;
    
    this.show = function(){ 
      fill(255);
      rect(this.x,0,this.w,this.top);
      rect(this.x,height - this.bottom, this.w, this.bottom);
      
    }
    this.update = function(){
      this.x -= this.speed;
    }
    this.offscreen= function(){
      
      return (this.x < -this.w)  ;
    }
    this.pass = function(bird){
      return (bird.x>this.x+this.w);
    }
    this.coll = function(bird){
      if((bird.x + bird.r/2 >= this.x && bird.x +bird.r/2 <= this.x + this.w)&&(bird.y - bird.r/2 <= this.top || bird.y + bird.r/2 >= height- this.bottom)){
        return true;
      }
      if(bird.y - bird.r/2 <= 0 || bird.y + bird.r/2 >= height){
        return true;
      }
      return false;
    }
  }