let playerHP = 20;

let enemies = [];

let enemiesToAdd = [];

function updateEnemies() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].update();

    if (!enemies[i].alive) {
      if (enemies[i] instanceof Rat) {
        earnMoney(15);
      } else if (enemies[i] instanceof Slime) {
    earnMoney(30);
      } else if (enemies[i] instanceof Mage) {
        earnMoney(50);
      } else {
        earnMoney(25);
      }
      enemies.splice(i, 1);
      continue;
    }

    if (enemies[i].reachedEnd) {
      playerHP -= 1;
      enemies.splice(i, 1);
    }
  }

  for (let e of enemiesToAdd) {
    enemies.push(e);
  }
  enemiesToAdd = [];
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
  enemiesToAdd = [];
}