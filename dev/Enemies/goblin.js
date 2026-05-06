class Goblin {
  constructor(mapName) {
    this.mapName = mapName;
    this.waypointIndex = 0;

    this.x = waypoints[mapName][0].x;
    this.y = waypoints[mapName][0].y;

    this.speed = 0.7;
    this.size = 40;

    this.alive = true;
    this.reachedEnd = false;

    // HP
    this.maxHp = 200;
    this.hp = this.maxHp;

    // animation
    this.frame = 0;
    this.frameSpeed = 0.10;
    this.frameTimer = 0;
    this.maxFrames = 6;

    // direction
    this.lastDir = "S";
  }

  update() {
    if (!this.alive || this.reachedEnd) return;

    let pts = waypoints[this.mapName];

    if (this.waypointIndex >= pts.length) {
      this.reachedEnd = true;
      return;
    }

    let target = pts[this.waypointIndex];

    let dx = target.x - this.x;
    let dy = target.y - this.y;

    this.facingRight = dx > 0;

    let dist = sqrt(dx * dx + dy * dy);

    // direction logic
    if (abs(dx) > abs(dy)) {
      this.lastDir = "S";
    } else {
      this.lastDir = dy < 0 ? "U" : "D";
    }

    // movement
    if (dist < this.speed) {
      this.x = target.x;
      this.y = target.y;
      this.waypointIndex++;
    } else {
      this.x += (dx / dist) * this.speed;
      this.y += (dy / dist) * this.speed;
    }

    // animation
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

  let s = (sx + sy) / 2;

  let x = this.x * sx;
  let y = this.y * sy;

  push();

  translate(x, y);

  if (this.facingRight) {
    scale(-1, 1);
  }

  image(
    img,
    0,
    0,
    this.size * s,
    this.size * s,
    this.frame * (img.width / this.maxFrames),
    0,
    img.width / this.maxFrames,
    img.height
  );

  pop();

  // ───────────── HEALTH BAR ─────────────
  let barW = this.size * sx;
  let barH = 6 * sy;

  let hpPercent = this.hp / this.maxHp;

  // background
  fill(80, 0, 0);
  rect(x - barW / 2, y - this.size * sy / 2 - 12, barW, barH);

  // fill
  fill(0, 200, 0);
  rect(x - barW / 2, y - this.size * sy / 2 - 12, barW * hpPercent, barH);
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