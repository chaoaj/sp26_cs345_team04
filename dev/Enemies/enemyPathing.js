const waypoints = {
  map1: [
    { x: 0,   y: 220 },  // spawn - left entrance
    { x: 130,  y: 220 },  // corner2
    { x: 135.5, y: 281 },  // verticalPath
    { x: 135.5, y: 338 },  // verticalPath
    { x: 165,  y: 423 },  // corner3
    { x: 250,  y: 406 },  // corner4
    { x: 251,  y: 338 },  // verticalPath
    { x: 251,  y: 273 },  // verticalPath
    { x: 251,  y: 208 },  // verticalPath
    { x: 251,  y: 144 },  // verticalPath
    { x: 251,  y: 80  },  // verticalPath
    { x: 265,  y: 20  },  // corner1 top left
    { x: 345,  y: 23  },  // corner2 top right
    { x: 363,  y: 88  },  // verticalPath
    { x: 363,  y: 144 },  // verticalPath
    { x: 363,  y: 224 },  // verticalPath
    { x: 363,  y: 303 },  // verticalPath
    { x: 378,  y: 420 },  // corner3
    { x: 459,  y: 403 },  // corner4
    { x: 473,  y: 284 },  // verticalPath
    { x: 483,  y: 210 },  // corner1
    { x: 569,  y: 200 },  // horizontalPath
    { x: 690,  y: 200 }   // exit - right side
  ],
  map2: [
    // add map2 waypoints here
  ]
};
 
// ─── ENEMY CLASS ──────────────────────────────────────────────────────────────
class Enemy {
  constructor(mapName) {
    this.mapName = mapName;
    this.waypointIndex = 0;
    this.x = waypoints[mapName][0].x;
    this.y = waypoints[mapName][0].y;
    this.speed = 2;
    this.maxHp = 100;
    this.size = 20;
    this.alive = true;
    this.reachedEnd = false;
  }
 
  update(sx, sy) {
    if (!this.alive || this.reachedEnd) return;
 
    let pts = waypoints[this.mapName];
    if (this.waypointIndex >= pts.length) {
      this.reachedEnd = true;
      return;
    }
 
    // move towards current waypoint
    let target = pts[this.waypointIndex];
    let tx = target.x * sx;
    let ty = target.y * sy;
    let dx = tx - this.x;
    let dy = ty - this.y;
    let dist = sqrt(dx * dx + dy * dy);
 
    if (dist < this.speed + 1) {
      this.waypointIndex++;
    } else {
      this.x += (dx / dist) * this.speed;
      this.y += (dy / dist) * this.speed;
    }
  }
 
  draw(sx, sy) {
    if (!this.alive) return;
 
    // Draw the enemy sprites
    noStroke();
    fill(220, 50, 50);
    ellipse(this.x, this.y, this.size * sx, this.size * sy);
  }
}
 

let enemies = [];
let enemySpawnTimer = 0;
let enemySpawnInterval = 120; // frames between spawns
 
function spawnEnemy(mapName) {
  if (waypoints[mapName] && waypoints[mapName].length > 0) {
    enemies.push(new Enemy(mapName));
  }
}
 
function updateEnemies(sx, sy, mapName) {
  enemySpawnTimer++;
  if (enemySpawnTimer >= enemySpawnInterval) {
    enemySpawnTimer = 0;
    spawnEnemy(mapName);
  }
 
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].update(sx, sy);
    if (!enemies[i].alive || enemies[i].reachedEnd) {
      enemies.splice(i, 1);
    }
  }
}
 
function drawEnemies(sx, sy) {
  for (let e of enemies) {
    e.draw(sx, sy);
  }
}
 
