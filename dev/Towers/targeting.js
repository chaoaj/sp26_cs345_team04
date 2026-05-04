let projectiles = [];
let impactAnims = [];


const PLATFORM_LAUNCH_OFFSET = -35;  // how many px up the platform jumps 
const PLATFORM_RISE_SPEED    = 2;    // px per frame going up
const PLATFORM_FALL_SPEED    = 1;    // px per frame coming back down
let damage = 0;
let range = 0;
let attackSpeed = 0;


function updateTowers() {
  //let sx = width / 640;
  //let sy = height / 448;
  

  for (let t of placedTowers) {

    let chain = t.chainIndex

    if (chain === 0) {
    damage = 20
    range = 240
    attackSpeed = 60
  } else if (chain === 1) {
    damage = 100
    range = 120
    attackSpeed = 120
  } else if (chain === 2) {
    damage = 12
    range = 180
    attackSpeed = 30
  }
    // init platform animation state
    if (t.cooldown      === undefined) t.cooldown      = 0;
    if (t.platformY     === undefined) t.platformY     = 0;
    if (t.platformState === undefined) t.platformState = 'idle';

    // tick platform animation
    if (t.platformState === 'rising') {
      t.platformY -= PLATFORM_RISE_SPEED;
      if (t.platformY <= PLATFORM_LAUNCH_OFFSET) {
        t.platformY     = PLATFORM_LAUNCH_OFFSET;
        t.platformState = 'falling';
      }
    } else if (t.platformState === 'falling') {
      t.platformY += PLATFORM_FALL_SPEED;
      if (t.platformY >= 0) {
        t.platformY     = 0;
        t.platformState = 'idle';
      }
    }

    if (t.cooldown > 0) { t.cooldown--; continue; }

    // find target
    let target = null;
    for (let e of enemies) {
      if (!e.alive || e.reachedEnd) continue;
      let d = dist(t.x, t.y, e.x * sx, e.y * sy);
      if (d < range) {
        if (!target || e.waypointIndex > target.waypointIndex) {
          target = e;
        }
      }
    }

    if (target) {
      let chain         = t.chainIndex ?? 0;
      let tier          = t.tier ?? 0;
      let platformIndex = chain * 3 + tier;

      // start projectile at platform position
      let platformY = t.y + (t.platformY ?? 0) - 3; // match yTop offset — adjust -3 if needed

      projectiles.push({
        x: t.x + (t.xOff ?? -3),  // match platform xOff
        y: platformY,
        target: target,
        chain: chain,
        platformIndex: platformIndex,
        sourceTower: t,            // used to hide resting projectile while in flight
        angle: 0,
        size: 36,                  // in-flight projectile size — adjust here
        hopDist: 18,               // total px to hop upward before flying — adjust here
        hopping: true,
      });

      t.platformState = 'rising';
      t.cooldown = attackSpeed;             // frames between shots — adjust here
    }
  }

  // --- Move projectiles ---
  for (let i = projectiles.length - 1; i >= 0; i--) {
    let p = projectiles[i];

    if (!p.target.alive || p.target.reachedEnd) {
      projectiles.splice(i, 1);
      continue;
    }

    //let sx = width / 640;
    //let sy = height / 448;
    let tx = p.target.x * sx;
    let ty = p.target.y * sy;

    if (p.hopping) {
      // hop straight up before flying
      p.y       -= 2;              // hop speed — adjust here
      p.hopDist -= 2;
      p.angle    = -HALF_PI;       // point upward while hopping

      if (p.hopDist <= 0) {
        p.hopping = false;         // done hopping, now fly toward target
      }
    } else {
      // normal flight toward target
      let dx = tx - p.x;
      let dy = ty - p.y;
      let d  = sqrt(dx * dx + dy * dy);

      p.angle = atan2(dy, dx);

      if (d < 6) {
        // hit
        p.target.hp -= damage;         // damage per hit — adjust here
        if (p.target.hp <= 0) p.target.alive = false;

        impactAnims.push({
          x: tx,
          y: ty,
          chain: p.chain,
          frame: 0,
          frameTimer: 0,
          frameSpeed: 0.2,         // impact animation speed — adjust here
        });

        projectiles.splice(i, 1);
      } else {
        p.x += (dx / d) * 5;      // flight speed — adjust here
        p.y += (dy / d) * 5;
      }
    }
  }

  // --- Tick impact animations ---
  for (let i = impactAnims.length - 1; i >= 0; i--) {
    let a = impactAnims[i];
    a.frameTimer += a.frameSpeed;
    if (a.frameTimer >= 1) {
      a.frameTimer = 0;
      a.frame++;
      if (a.frame >= projImpact[a.chain].length) {
        impactAnims.splice(i, 1);
      }
    }
  }
}

function drawProjectiles() {
  imageMode(CENTER);

 for (let p of projectiles) {
  let img = projFlight[p.chain];
  if (img) {
    push();
    translate(p.x, p.y);
    rotate(p.angle);
    if (p.chain === 1) scale(-1, 1);
    image(img, 0, 0, p.size, p.size);
    pop();
  } else {
    noStroke();
    fill(255, 220, 0);
    circle(p.x, p.y, 10);
  }
}

  // --- Draw impact animations ---
  for (let a of impactAnims) {
    let frames = projImpact[a.chain];
    if (frames && a.frame < frames.length) {
      image(frames[a.frame], a.x, a.y, 48, 48);  // impact size — adjust here
    }
  }

  imageMode(CORNER);
}

function drawPlacedTowersWithPlatforms() {
  imageMode(CENTER);
  for (let t of placedTowers) {
    let chain = t.chainIndex ?? 0;
    let tier  = t.tier ?? 0;
    let pi    = chain * 3 + tier;

    let top      = platformTop[pi];
    let bot      = platformBot[pi];
    let towerImg = t.img;
    let pOffset  = t.platformY ?? 0;

    let xOff, yTop, yBot, pWidth, pHeight;

      if (chain === 0) {
      xOff    = -3;   // horizontal nudge
      yTop    = -3;   // top piece vertical position
      yBot    = 14;   // bottom piece vertical position
      pWidth  = 70;   // platform width
      pHeight = 18;   // platform height
    } else if (chain === 1) {
      xOff    = -3;  
      yTop    = -6;
      yBot    = 3;
      pWidth  = 80;
      pHeight = 25;
    } else {
      xOff    = -3;   
      yTop    = -3;
      yBot    = 14;
      pWidth  = 70;
      pHeight = 18;
    }

    t.xOff = xOff;

    if (top) image(top, t.x + xOff, t.y + yTop + pOffset, pWidth, pHeight);
    if (towerImg) image(towerImg, t.x, t.y, 85, 85);
    let hasFlyingProjectile = projectiles.some(p => p.sourceTower === t);
    let isReturning         = t.platformState === 'falling';

   if (!hasFlyingProjectile && !isReturning) {
  let img = projFlight[chain];
  if (img) {
    push();
    translate(t.x + xOff, t.y + yTop + pOffset + (t.yRest ?? 5));
    if (chain === 1) scale(-1, 1);  
    imageMode(CENTER);
    image(img, 0, 0, 28, 28);
    pop();
  }
}

    if (bot) image(bot, t.x + xOff, t.y + yBot + pOffset, pWidth, pHeight);
  }
  imageMode(CORNER);
}