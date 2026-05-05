let placedTowers = [];
let draggingTower = null;

function drawDraggingTower() {
  if (!draggingTower) return;
  image(draggingTower.img, mouseX - 42, mouseY - 42, 85, 85);
}

function drawPlacedTowers() {
  for (let t of placedTowers) {
    image(t.img, t.x - 42, t.y - 42, 85, 85);
  }
}

function storeMouseReleased() {
  if (!draggingTower) return;

  if (isValidPlacement(mouseX, mouseY)) {
    if (!spendMoney(draggingTower.cost)) {
      draggingTower = null;
      return;
    }
    let stats = getTowerStats(draggingTower.chainIndex, draggingTower.cost);
    placedTowers.push({
      img: draggingTower.img,
      x: mouseX,
      y: mouseY,
      tier: 0,
      chainIndex: draggingTower.chainIndex,
      cost: draggingTower.cost,
      damage: stats.damage,
      range: stats.range,
      attackSpeed: stats.attackSpeed,
    });
  }

  draggingTower = null;
}

function getTowerStats(chainIndex, cost) {
  if (chainIndex === 0) {
    let damage = 20, range = 240, attackSpeed = 60;
    if (cost === 250) range = 280;
    else if (cost === 550) range = 320;
    return { damage, range, attackSpeed };
  } else if (chainIndex === 1) {
    let damage = 60, range = 130, attackSpeed = 90;
    if (cost === 250) damage = 80;
    else if (cost === 550) damage = 100;
    return { damage, range, attackSpeed };
  } else {
    let damage = 12, range = 180, attackSpeed = 45;
    if (cost === 250) attackSpeed = 35;
    else if (cost === 550) attackSpeed = 25;
    return { damage, range, attackSpeed };
  }
}

function isValidPlacement(x, y) {
  // block store area (right side)
  if (x > width - 320) return false;

  let sx, sy, scale;

  if (gameState === 'map1') {
    sx = width / 640;
    sy = height / 448;
    scale = Math.min(sx, sy);

    let pts = waypoints['map1'];
    for (let i = 0; i < pts.length - 1; i++) {
      let ax = pts[i].x * sx;
      let ay = pts[i].y * sy;
      let bx = pts[i + 1].x * sx;
      let by = pts[i + 1].y * sy;

      if (distToSegment(x, y, ax, ay, bx, by) < 40 * scale) return false;
    }

    // map1 blocked corner
    if (x > 25 * sx && x < 175 * sx && y > 25 * sy && y < 175 * sy)
      return false;
  }

  else if (gameState === 'map2') {
    sx = width / 640;
    sy = height / 640;
    scale = Math.min(sx, sy);

    let paths = [waypoints['map2_path1'], waypoints['map2_path2']];

    for (let pts of paths) {
      for (let i = 0; i < pts.length - 1; i++) {
        let ax = pts[i].x * sx;
        let ay = pts[i].y * sy;
        let bx = pts[i + 1].x * sx;
        let by = pts[i + 1].y * sy;

        if (distToSegment(x, y, ax, ay, bx, by) < 40 * scale) return false;
      }
    }

    if (x > 120*sx && x < 320*sx && y > 120*sy && y < 320*sy) return false;
  }

  else if (gameState === 'map3') {
    sx = width / 710;
    sy = height / 750;
    scale = Math.min(sx, sy);

    let paths = [waypoints['map3_path1'], waypoints['map3_path2']];

    for (let pts of paths) {
      for (let i = 0; i < pts.length - 1; i++) {
        let ax = pts[i].x * sx;
        let ay = pts[i].y * sy;
        let bx = pts[i + 1].x * sx;
        let by = pts[i + 1].y * sy;

        if (distToSegment(x, y, ax, ay, bx, by) < 40 * scale) return false;
      }
    }
  }

  else {
    return false; // safety fallback
  }

  return true;
}

function distToSegment(px, py, ax, ay, bx, by) {
  let dx = bx - ax;
  let dy = by - ay;
  let lenSq = dx * dx + dy * dy;
  let t = lenSq === 0 ? 0 : constrain(((px - ax) * dx + (py - ay) * dy) / lenSq, 0, 1);
  let nearX = ax + t * dx;
  let nearY = ay + t * dy;
  return dist(px, py, nearX, nearY);
}

function storeMousePressed() {

  for (let t of placedTowers) {
    if (dist(mouseX, mouseY, t.x, t.y) < 42) {
      selectedTower = (selectedTower === t) ? null : t;
      return;
    }
  }

  if (storeOpen) {
    let lvlBtnX = width - 60;
    let lvlBtnY = height - 60;
    if (mouseX > lvlBtnX &&
      mouseX < lvlBtnX + 50 &&
      mouseY > lvlBtnY &&
      mouseY < lvlBtnY + 50) {

      gameState = 'levelSelect';

      return
    }
  }

  if (!storeOpen) return;

  let storeX = width - 320;
  let slots = [
    // Column 1
    { lx: 10, ly: 45, img: tower1, cost: 100, chainIndex: 0 },
    { lx: 10, ly: 175, img: tower2, cost: 250, chainIndex: 0 },
    { lx: 10, ly: 325, img: tower3, cost: 550, chainIndex: 0 },

    // Column 2
    { lx: 110, ly: 45, img: tower4, cost: 100, chainIndex: 1 },
    { lx: 110, ly: 175, img: tower5, cost: 250, chainIndex: 1 },
    { lx: 110, ly: 325, img: tower6, cost: 550, chainIndex: 1 },

    // Column 3
    { lx: 210, ly: 45, img: tower7, cost: 100, chainIndex: 2 },
    { lx: 210, ly: 175, img: tower8, cost: 250, chainIndex: 2 },
    { lx: 210, ly: 325, img: tower9, cost: 550, chainIndex: 2 },
  ];


  for (let s of slots) {
    let ax = storeX + s.lx;
    let ay = s.ly;
    if (mouseX > ax && mouseX < ax + 85 && mouseY > ay && mouseY < ay + 85) {

      if (!canAfford(s.cost)) {
        console.log("Not enough money!");
        return;
      }
      draggingTower = { img: s.img, cost: s.cost, chainIndex: s.chainIndex };
      return;
    }
  }
}

function clearTowers() {
  placedTowers = [];
  draggingTower = null;
}