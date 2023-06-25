/**
 * @name Portfolio
 * @author <creative.slab2.8@gmail.com>
 * @site https://sonialitwin.github.io/
 */
let width;
let height
let mouseX;
let mouseY;
const FLEE_RADIUS = 20;

window.onload = function () {
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;//- 5


  let boids = [];
  for (let i = 0; i < 400; i++) {
    boids.push(new Boid(Math.random() * width, Math.random() * height, 5))
  }


  // mouse 
  window.addEventListener('mousemove', function (e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY
  })


  function animate() {
    let grd = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
    grd.addColorStop(0, "rgba(255, 255, 255, 1)"); //background nice yellow version rgba(255, 196, 41, 1)
    grd.addColorStop(1, "rgba(255, 255, 255, 1)"); //"rgba(0, 0, 25, 1)" gradient
    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    // mouse
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 196, 41, 1)'; //yellow 'rgba(255, 196, 41, 1)' gray 'rgba(128, 128, 128, 1)'
    ctx.arc(mouseX, mouseY, FLEE_RADIUS, 0, Math.PI * 2);
    ctx.fill(); //fill the circle with yellow
    //path around
    /**ctx.strokeStyle = 'rgba(255, 196, 41, 1)'; //yellow
    ctx.arc(mouseX, mouseY, FLEE_RADIUS, 0, Math.PI * 2);
    ctx.stroke();*/

    ctx.closePath();

    for (const b of boids) {
      b.update()
      b.applyFlock(boids);
      b.boundaries();
      b.render(ctx);
    }
    
    //boid
    ctx.globalCompositeOperation = 'source-over'; //make the boids appear on top of the circle


    requestAnimationFrame(animate);
  }
  animate();

}