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

  if (isValidPlacement(mouseX, mouseY, lastMap)) {
    if (!spendMoney(draggingTower.cost)) {
      draggingTower = null;
      return;
    }
    placedTowers.push({
      img: draggingTower.img,
      x: mouseX,
      y: mouseY,
      tier: 0,
      chainIndex: draggingTower.chainIndex,
      range: draggingTower.range,
      attackSpeed: draggingTower.attackSpeed,
      damage: draggingTower.damage
    });
  }

  draggingTower = null;
}

function isValidPlacement(x, y, mapName) {
  if (x > width - 320) return false;

  // use correct dimensions per map
  let sx, sy;
  if (mapName === 'map2') {
    sx = width / 640;
    sy = height / 640;
  } else if (mapName === 'map3') {
    sx = width / 710;
    sy = height / 750;
  } else {
    sx = width / 640;
    sy = height / 448;
  }

  // check all paths for current map
  let pathKeys = Object.keys(waypoints).filter(k => k.startsWith(mapName));
  for (let key of pathKeys) {
    let pts = waypoints[key];
    for (let i = 0; i < pts.length - 1; i++) {
      let ax = pts[i].x * sx;
      let ay = pts[i].y * sy;
      let bx = pts[i + 1].x * sx;
      let by = pts[i + 1].y * sy;
      let d = distToSegment(x, y, ax, ay, bx, by);
      if (d < 40 * sx) return false;
    }
  }

  // only block house area on map1
  if (mapName === 'map1') {
    if (x > 25 * sx && x < 175 * sx && y > 25 * sy && y < 175 * sy) return false;
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
      return;
    }
  }

  if (!storeOpen) return;

  let storeX = width - 320;
  let slots = [
  // Chain 0 - tier 1, 2, 3
  { lx: 10,  ly: 45,  img: tower1, cost: 150, chainIndex: 0, range: 200, attackSpeed: 70, damage: 15 },
  { lx: 10,  ly: 175, img: tower2, cost: 500, chainIndex: 0, range: 240, attackSpeed: 60, damage: 25 },
  { lx: 10,  ly: 325, img: tower3, cost: 1500, chainIndex: 0, range: 300, attackSpeed: 45, damage: 50 },

  // Chain 1 - tier 1, 2, 3
  { lx: 110, ly: 45,  img: tower4, cost: 150, chainIndex: 1, range: 250, attackSpeed: 40, damage: 10 },
  { lx: 110, ly: 175, img: tower5, cost: 500, chainIndex: 1, range: 300, attackSpeed: 35, damage: 20 },
  { lx: 110, ly: 325, img: tower6, cost: 1500, chainIndex: 1, range: 350, attackSpeed: 30, damage: 25 },

  // Chain 2 - tier 1, 2, 3
  { lx: 210, ly: 45,  img: tower7, cost: 150, chainIndex: 2, range: 160, attackSpeed: 100, damage: 35 },
  { lx: 210, ly: 175, img: tower8, cost: 500, chainIndex: 2, range: 180, attackSpeed: 80, damage: 50 },
  { lx: 210, ly: 325, img: tower9, cost: 1500, chainIndex: 2, range: 200, attackSpeed: 70, damage: 80 },
];

  for (let s of slots) {
    let ax = storeX + s.lx;
    let ay = s.ly;
    if (mouseX > ax && mouseX < ax + 85 && mouseY > ay && mouseY < ay + 85) {
      if (!canAfford(s.cost)) {
        console.log("Not enough money!");
        return;
      }
      draggingTower = { img: s.img, cost: s.cost, chainIndex: s.chainIndex, range: s.range, attackSpeed: s.attackSpeed, damage: s.damage };
      return;
    }
  }
}

function clearTowers() {
  placedTowers = [];
  draggingTower = null;
}