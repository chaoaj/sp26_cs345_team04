class Goblin {
  constructor(mapName) {
    this.mapName = mapName;
    this.waypointIndex = 0;

    this.x = waypoints[mapName][0].x;
    this.y = waypoints[mapName][0].y;

    this.speed = 10;
    this.size = 40;

    this.alive = true;
    this.reachedEnd = false;

    // animation
    this.frame = 0;
    this.frameSpeed = 0.15;
    this.frameTimer = 0;
    this.maxFrames = 6;

    // direction
    this.facingRight = true;
    this.lastDir = "S";
  }

  update() {
    let prevX = this.x;

    if (!this.alive || this.reachedEnd) return;

    let pts = waypoints[this.mapName];

    if (this.waypointIndex >= pts.length) {
      this.reachedEnd = true;
      return;
    }

    let target = pts[this.waypointIndex];

    let dx = target.x - this.x;
    let dy = target.y - this.y;

    let dist = sqrt(dx * dx + dy * dy);

    // movement direction
    // direction logic
if (Math.abs(dx) > Math.abs(dy)) {
  // horizontal movement
  this.lastDir = "S";
  this.facingRight = dx > 0;
} else {
  // vertical movement
  if (dy < 0) this.lastDir = "U";
  else this.lastDir = "D";
}

let movingRight = this.x > prevX;

if (Math.abs(dx) > Math.abs(dy)) {
  this.lastDir = "S";
  this.facingRight = movingRight;
} else {
  if (dy < 0) this.lastDir = "U";
  else this.lastDir = "D";
}

    // move
    if (dist < this.speed) {
      this.x = target.x;
      this.y = target.y;
      this.waypointIndex++;
    } else {
      this.x += (dx / dist) * this.speed;
      this.y += (dy / dist) * this.speed;
    }

    // animation only when moving
    if (dist > 0.1) {
      this.frameTimer += this.frameSpeed;

      if (this.frameTimer >= 1) {
        this.frameTimer = 0;
        this.frame = (this.frame + 1) % this.maxFrames;
    } 
    }
  }

  draw(sx, sy) {
  if (!this.alive) return;

  imageMode(CENTER);

  let key = `goblin/${this.lastDir}_walk.png`;
  let img = goblinSprites[key];

  if (!img) return;

  let frameW = img.width / this.maxFrames;
  let frameH = img.height;

  let s = (sx + sy) / 2;

  let x = this.x * sx;
  let y = this.y * sy;

  push();
  translate(x, y);

  if (this.facingRight === false) {
  scale(-1, 1);
  }

  image(
    img,
    0,
    0,
    this.size * s,
    this.size * s,
    this.frame * frameW,
    0,
    frameW,
    frameH
  );

  pop();
}
}

let goblinSprites = {};

function loadGoblinSprites() {
  goblinSprites["goblin/S_walk.png"] =
    loadImage("Sprites/Enemy Sprites/Goblin/S_walk.png");

  goblinSprites["goblin/U_walk.png"] =
    loadImage("Sprites/Enemy Sprites/Goblin/U_walk.png");

  goblinSprites["goblin/D_walk.png"] =
    loadImage("Sprites/Enemy Sprites/Goblin/D_walk.png");
}