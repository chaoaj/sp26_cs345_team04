class Mage {
  constructor(mapName) {
    this.mapName = mapName;
    this.waypointIndex = 0;

    this.x = waypoints[mapName][0].x;
    this.y = waypoints[mapName][0].y;

    this.speed = 0.5;
    this.size = 60;

    this.alive = true;
    this.reachedEnd = false;

    // HP
    this.maxHp = 400;
    this.hp = this.maxHp;

    // walk animation
    this.frame = 0;
    this.frameSpeed = 0.08;
    this.frameTimer = 0;
    this.maxFrames = 6;

    // direction
    this.lastDir = "S";
    this.facingRight = false;

    // ───────────── SUMMONING ─────────────
    this.waypointsSinceLastSummon = 0;
    this.summonEvery = 3;

    this.isAttacking = false;
    this.attackFrame = 0;
    this.attackFrameTimer = 0;
    this.attackFrameSpeed = 0.12;
    this.attackMaxFrames = 6;
    this.ratsSpawned = 0;    // track how many rats spawned this attack
    this.ratSpawnTimer = 0;  // countdown between each rat spawn
    this.ratSpawnDelay = 40; // frames between each rat
  }

  update() {
    if (!this.alive || this.reachedEnd) return;

    // ── ATTACK STATE: freeze and play attack animation ──
    if (this.isAttacking) {
      this.attackFrameTimer += this.attackFrameSpeed;

      // tick rat spawn timer
      if (this.ratsSpawned < 3) {
        this.ratSpawnTimer--;
        if (this.ratSpawnTimer <= 0) {
          this.spawnOneRat();
          this.ratsSpawned++;
          this.ratSpawnTimer = this.ratSpawnDelay;
        }
      }

      if (this.attackFrameTimer >= 1) {
        this.attackFrameTimer = 0;
        this.attackFrame++;

        if (this.attackFrame >= this.attackMaxFrames) {
          // loop attack animation until all 3 rats are spawned
          if (this.ratsSpawned < 3) {
            this.attackFrame = 0;
          } else {
            // all rats spawned, resume walking
            this.attackFrame = 0;
            this.isAttacking = false;
            this.ratsSpawned = 0;
            this.ratSpawnTimer = 0;
          }
        }
      }
      return; // don't move while attacking
    }

    // ── WALKING STATE ──
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
      this.waypointsSinceLastSummon++;

      // check if it's time to summon
      if (this.waypointsSinceLastSummon >= this.summonEvery) {
        this.waypointsSinceLastSummon = 0;
        this.isAttacking = true;
        this.attackFrame = 0;
        this.attackFrameTimer = 0;
        this.ratsSpawned = 0;
        this.ratSpawnTimer = 0; // 0 means first rat spawns on the very next frame
      }
    } else {
      this.x += (dx / dist) * this.speed;
      this.y += (dy / dist) * this.speed;
    }

    // walk animation
    if (dist > 0.1) {
      this.frameTimer += this.frameSpeed;
      if (this.frameTimer >= 1) {
        this.frameTimer = 0;
        this.frame = (this.frame + 1) % this.maxFrames;
      }
    }
  }

  spawnOneRat() {
    let rat = new Rat(this.mapName);
    rat.x = this.x + random(-10, 10);
    rat.y = this.y + random(-10, 10);
    rat.waypointIndex = this.waypointIndex;
    enemiesToAdd.push(rat);
  }

  draw(sx, sy) {
    if (!this.alive) return;

    imageMode(CENTER);

    let x = this.x * sx;
    let y = this.y * sy;
    let s = (sx + sy) / 2;

    push();
    translate(x, y);
    if (this.facingRight) scale(-1, 1);

    if (this.isAttacking) {
      // draw attack animation
      let key = `mage/${this.lastDir}_Attack.png`;
      let img = mageSprites[key];
      if (img) {
        image(
          img,
          0, 0,
          this.size * s,
          this.size * s,
          this.attackFrame * (img.width / this.attackMaxFrames),
          0,
          img.width / this.attackMaxFrames,
          img.height
        );
      }
    } else {
      // draw fly/walk animation
      let key = `mage/${this.lastDir}_fly.png`;
      let img = mageSprites[key];
      if (img) {
        image(
          img,
          0, 0,
          this.size * s,
          this.size * s,
          this.frame * (img.width / this.maxFrames),
          0,
          img.width / this.maxFrames,
          img.height
        );
      }
    }

    pop();

    // ───────────── HEALTH BAR ─────────────
    let barW = this.size * sx;
    let barH = 6 * sy;
    let hpPercent = this.hp / this.maxHp;

    noStroke();
    fill(80, 0, 0);
    rect(x - barW / 2, y - this.size * sy / 2 - 12, barW, barH);
    fill(160, 0, 200);
    rect(x - barW / 2, y - this.size * sy / 2 - 12, barW * hpPercent, barH);
  }
}

// ───────────── SPRITE LOADING ─────────────
let mageSprites = {};

function loadMageSprites() {
  // fly sprites
  mageSprites["mage/S_fly.png"] = loadImage("Sprites/Enemy Sprites/Mage/S_fly.png");
  mageSprites["mage/U_fly.png"] = loadImage("Sprites/Enemy Sprites/Mage/U_fly.png");
  mageSprites["mage/D_fly.png"] = loadImage("Sprites/Enemy Sprites/Mage/D_fly.png");

  // attack sprites
  mageSprites["mage/S_Attack.png"] = loadImage("Sprites/Enemy Sprites/Mage/S_Attack.png");
  mageSprites["mage/U_Attack.png"] = loadImage("Sprites/Enemy Sprites/Mage/U_Attack.png");
  mageSprites["mage/D_Attack.png"] = loadImage("Sprites/Enemy Sprites/Mage/D_Attack.png");
}