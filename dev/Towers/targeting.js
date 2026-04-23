let projectiles = [];
 
function updateTowers() {
  let sx = width / 640;
  let sy = height / 448;
 
  // --- Each tower tries to shoot ---
  for (let t of placedTowers) {
 
    // Set up cooldown the first time
    if (t.cooldown === undefined) t.cooldown = 0;
    if (t.cooldown > 0) { t.cooldown--; continue; }
 
    // Find the enemy furthest along the path within range
    let target = null;
    for (let e of enemies) {
      if (!e.alive || e.reachedEnd) continue;
      let d = dist(t.x, t.y, e.x * sx, e.y * sy);
      if (d < 240) { // 240 = range in pixels
        if (!target || e.waypointIndex > target.waypointIndex) {
          target = e;
        }
      }
    }
 
    // If we found a target, shoot at it
    if (target) {
      projectiles.push({ x: t.x, y: t.y, target: target });
      t.cooldown = 60; // 60 frames between shots
    }
  }
 
  // --- Move and draw each bullet ---
  for (let i = projectiles.length - 1; i >= 0; i--) {
    let p = projectiles[i];
 
    // Remove bullet if target is already dead
    if (!p.target.alive || p.target.reachedEnd) {
      projectiles.splice(i, 1);
      continue;
    }
 
    // Move toward target
    let tx = p.target.x * sx;
    let ty = p.target.y * sy;
    let dx = tx - p.x;
    let dy = ty - p.y;
    let d = sqrt(dx * dx + dy * dy);
 
    if (d < 5) {
      // Close enough — hit!
      p.target.hp -= 20;
      if (p.target.hp <= 0) p.target.alive = false;
      projectiles.splice(i, 1);
    } else {
      // Keep moving
      p.x += (dx / d) * 5; // 5 = bullet speed
      p.y += (dy / d) * 5;
 
      // Draw circle bullet
      noStroke();
      fill(255, 220, 0);
      circle(p.x, p.y, 10);
    }
  }
}