
class Boundry {
  
  constructor(x1, y1, x2, y2, ctx, id) {
    this.id = id;
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.ctx = ctx;
    this.visible = false;
  }

  show() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x1, this.y1);    
    this.ctx.lineTo(this.x2, this.y2);
    this.ctx.lineWidth=2; 
    this.ctx.strokeStyle=(this.visible === true) ? '#ff0000' : '#00FF00';
    ;
    this.ctx.stroke()
    this.ctx.closePath();
  }
}

class Line {
  construcor(x1, y1, x2, y2, ctx) {

  }
}

function dist(x1, y1, x2, y2) {
  return Math.sqrt( (x2 - x1 ) * (x2 - x1) + (y2 - y1) * (y2 - y1) );
}

class Ray {
  
  constructor(x1,y1,angle,ctx) {
    this.id = angle;
    this.x1 = x1;
    this.y1 = y1;
    this.ctx = ctx;
    this.x2 = x1 + 10 * Math.cos(angle * Math.PI / 180);
    this.y2 = y1 + 10 * Math.sin(angle * Math.PI / 180);
    this.end = {};
    this.end.x = null;
    this.end.y = null;
  }

  show() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x1, this.y1);    
    //this.ctx.arc(this.x1, this.y1, 5, 0, 2 * Math.PI, false);
    this.ctx.lineTo(this.x2,this.y2);
    this.ctx.lineWidth=2; 
    this.ctx.strokeStyle='#ff0000';
    this.ctx.stroke()
    this.ctx.closePath();
  }

  lookAt(tar) {
    let x3 = this.x1;
    let x4 = this.x2;
    let y3 = this.y1;
    let y4 = this.y2;

    let x1 = tar.x1;
    let x2 = tar.x2;
    let y1 = tar.y1;
    let y2 = tar.y2;

    let den = (x1 - x2) * (y3 - y4) - (y1 -y2) * (x3 - x4);
    if( den ) {
      let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
      let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
      if( u > 0 && t > 0 && t < 1 ) {
        let end = { 
          x: (x1 + t * (x2 - x1)),
          y: (y1 + t * (y2 - y1))
        };  
        this.x2 = end.x;
        this.y2 = end.y;
        return end;
        /*this.ctx.lineTo(end.x, end.y);
        this.ctx.beginPath();
        this.ctx.moveTo(this.x1, this.y1);
        this.ctx.lineWidth=2; 
        this.ctx.strokeStyle='#ff0000';
        this.ctx.stroke()
        this.ctx.closePath(); */
      }
    } else return false;
  }
}

  let rayX = 300;
  let rayY = 100;
  const canvas = document.getElementById('app');
  canvas.width = window.innerWidth / 2;
  canvas.height = window.innerHeight ;
  const ctx = canvas.getContext('2d');
  canvas.onmousemove = (e) => { rayX = e.clientX; rayY = e.clientY; }
const game = () => {

  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  let walls = [];
  let rays = [];
  walls.push( new Boundry(100,100,270,270,ctx, 1) );
  walls.push( new Boundry(70,170,70,270,ctx, 2) );
  
  for( let i = 0; i < 360; i+=10 ) {
    rays.push(new Ray(rayX,rayY,i ,ctx));  
  }


  for( ray of rays) {
   let closest = null;
   let record = Infinity; 
   let wallsLookedAt = 0;
   let distances = [];
   for( wall of walls ) {
     let rayEnd = ray.lookAt(wall);   
     if( rayEnd ) {
       wallsLookedAt++;
       let d = dist( rayEnd.x, rayEnd.y, ray.x1, ray.y1 );
       distances.push(d);
       if( d < record ) {
         record = d;
         closest = wall; 
       }
     }
   }
   if( closest ) {
      closest.visible = true;
      ray.lookAt(closest);
      ray.show();
   }
 }

  for( wall of walls ) {
    wall.show();
  }

/*  ctx.fillStyle = 'green';
  let width = canvas.width;
  let height = canvas.height;
  console.log(width, height);
  ctx.fillRect(width/2, height/2, 150, 100);
  let rx = 200;
  let ry = 200;
  for(let i = 0; i < 360; i++) {
      let x = rx + 100 * Math.cos(i * Math.PI / 180);
      let y = ry + 100 * Math.sin(i * Math.PI / 180);
 
ctx.beginPath();
  ctx.moveTo(rx, ry);    
  ctx.lineTo(x, y);
  ctx.lineWidth=2; 
  ctx.strokeStyle='#ff0000';
  ctx.stroke()
ctx.closePath();

  }*/
/*  var img = new Image();
  img.addEventListener('load', function() {
    console.log(img.width, img.height);
    ctx.drawImage(img,100,140,23,30, 0,0,23,30);
  }, false);
  img.src='21199.png';
  */
  window.requestAnimationFrame(game);
}

game();
