class Boid {
  constructor(x, y, radius) {
    this.pos = new Vector(x, y);
    this.acc = new Vector(0, 0);
    this.vel = Vector.random2D(0, 0);
    this.vel.mult(10);

    this.radius = radius || 5;
    this.maxSpeed = 2;
    this.maxForce = 0.05;
    this.mass = 0.2;

    this.flock = new Flock(this);
    this.flockMultiplier = {
      separate: 2.0,
      align: 1.2,
      cohesion: 1.3,
      wander: 0.5
    };

    let names = [
      'hanna', 'mona', 'cutie',
      'sweety', 'sofia', 'rose',
      'laisy', 'daisy', 'mia',
      'joe', 'jim', 'kim',
      'keo', 'shaun', 'morgan',
      'jery', 'tom', 'anu',
      'brian', 'ninja', 'daniel'
    ];

     this.name = names[Math.floor(Math.random() * names.length)];

  }


  /**
   * @method update()
   * updates velocity, position, and acceleration
   */
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }


  /**
   * @method applyForce()
   * @param {Number} f 
   * applies force to acceleration
   */
  applyForce(f) { this.acc.add(f) }


  /**
   * @method boundaries()
   * check boundaries and limit agents within screen
   */
  boundaries() {
    let d = 100;
    let desire = null;
    if (this.pos.x < d) {
      desire = new Vector(this.maxSpeed, this.vel.y);
    } else if (this.pos.x > width - d) {
      desire = new Vector(-this.maxSpeed, this.vel.y);
    }
    if (this.pos.y < d) {
      desire = new Vector(this.vel.x, this.maxSpeed);
    } else if (this.pos.y > height - d) {
      desire = new Vector(this.vel.x, -this.maxSpeed);
    }
    if (desire !== null) {
      desire.normalize();
      desire.mult(this.maxSpeed);
      let steer = Vector.sub(desire, this.vel);
      steer.limit(0.10);
      this.applyForce(steer);
    }
  }


  /**
   * @method applyFlock()
   * @param {*} agents 
   * calculates all the flocking code apply it to the acceleration
   */
  applyFlock(agents) {
    let sep = this.flock.separate(agents);
    let ali = this.flock.align(agents);
    let coh = this.flock.cohesion(agents);
    let wander = this.flock.wander();
    let flee = this.flock.flee(new Vector(mouseX, mouseY))

    sep.mult(this.flockMultiplier.separate);
    ali.mult(this.flockMultiplier.align);
    coh.mult(this.flockMultiplier.cohesion);
    wander.mult(this.flockMultiplier.wander);
    flee.mult(50);
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
    this.applyForce(wander);
    this.applyForce(flee);
  }


  renderNames() {
    noStroke();
    fill(35);
    textAlign(CENTER);
    textSize(10)
    text(this.name, this.pos.x - this.radius, this.pos.y - this.radius - 5)
  }
  /**
   * Render Agent
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.beginPath(); // This starts a new path for drawing on canvas
    let angle = this.vel.heading(); // This calculates the angle of rotation based on the velocity vector direction
    
    ctx.save(); // This saves the current state of canvas
    ctx.fillStyle = '#000000';

    // This is where you check if the boid is above the circle and change its color accordingly
    /**let d = Vector.dist(this.pos, new Vector(mouseX, mouseY)); // This calculates the distance between the boid and the mouse cursor
    if (d < FLEE_RADIUS) { // If the distance is less than the flee radius
      ctx.fillStyle = 'rgba(255, 196, 41, 1)'; //yellow // This sets the fill color of the boid to yellow
    } else { // If the distance is greater than or equal to the flee radius
      // This is where you calculate the fill color of the boid based on the distance from the mouse cursor
        let d = Vector.dist(this.pos, new Vector(mouseX, mouseY)); // This calculates the distance between the boid and the mouse cursor
        let t = 2*d / FLEE_RADIUS; // This calculates a fraction between 0 and 1 based on the distance and the flee radius
        let r = lerp(255, 0, t); // This interpolates between 255 (yellow) and 0 (black) for the red component
        let g = lerp(196, 0, t); // This interpolates between 196 (yellow) and 0 (black) for the green component
        let b = lerp(41, 0, t); // This interpolates between 41 (yellow) and 0 (black) for the blue component
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`; // This sets the fill color of the boid using template literals
    }*/
    
	ctx.translate(this.pos.x, this.pos.y); // This translates canvas origin to boid position
    
	ctx.rotate(angle); // This rotates canvas by angle
    
	ctx.arc(0, 0, 4, 0, Math.PI * 2) 
	//This draws an arc with center at origin, radius of 4 pixels, start angle of 0 radians and end angle of 2 pi radians (a full circle)
    
	ctx.fill(); 
	//This fills boids with color
    
	ctx.restore(); 
	//This restores canvas state to previous one
    
	ctx.closePath(); 
	//This closes path for drawing on canvas
    
  }
}
