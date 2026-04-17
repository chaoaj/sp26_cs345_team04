let playerHP = 20;

let enemies = [];

function updateEnemies() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].update();

    if (enemies[i].reachedEnd) {
      playerHP = playerHP - 1;
      enemies.splice(i, 1);
    }
  }
}

function drawEnemies(sx, sy) {
  push();
  imageMode(CENTER);

  for (let e of enemies) {
    e.draw(sx, sy);
  }
  pop();
}

function resetEnemies() {
  enemies = [];
}