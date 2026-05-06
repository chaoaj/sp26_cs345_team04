let currentWave = 0;
let enemiesToSpawn = 0;
let spawnCooldown = 0;
let timeBetweenSpawns = 60;
let waveInProgress = false;

let magesToSpawn = 0;
let mageSpawnTimer = 0;
let mageSpawnDelay = 180;

let nextGoblinIn = 0;

function getMagePath(mapName) {
  if (mapName === 'map2') return 'map2_path1';
  if (mapName === 'map3') return 'map3_path1';
  return mapName;
}

function startWave() {
  if (waveInProgress) return;

  currentWave++;
  enemiesToSpawn = 2 + currentWave * 2;
  spawnCooldown = 0;
  waveInProgress = true;

  timeBetweenSpawns = max(10, 60 - (floor((currentWave - 1) / 5) * 15)); // Decrease spawn time every 5 waves, min 10 frames

  if (currentWave % 5 === 0) {
    magesToSpawn = currentWave / 5;
    mageSpawnTimer = mageSpawnDelay;
  }
}

function spawnEnemy(mapName) {
  if (mapName === 'map3') {
    let path = (enemies.length % 2 === 0) ? 'map3_path1' : 'map3_path2';
    if (currentWave > 3 && enemies.length % 3 === 0) {
      enemies.push(new Goblin(path));
    } else {
      enemies.push(new Slime(path));
    }
  } else if (mapName === 'map2') {
    let path = (enemies.length % 2 === 0) ? 'map2_path1' : 'map2_path2';
    if (currentWave > 3 && enemies.length % 3 === 0) {
      enemies.push(new Goblin(path));
    } else {
      enemies.push(new Slime(path));
    }
  } else {
    if (currentWave > 3 && enemies.length % 3 === 0) {
      enemies.push(new Goblin(mapName));
    } else {
      enemies.push(new Slime(mapName));
    }
  }
}

function RewardPlayer() {
  let basereward = 50;
  let waveBonus = currentWave * 10;
  money += basereward + waveBonus;
}

function updateWaves(mapName) {
  if (!waveInProgress) return;

  // staggered mage spawning
  if (magesToSpawn > 0) {
    mageSpawnTimer--;
    if (mageSpawnTimer <= 0) {
      enemiesToAdd.push(new Mage(getMagePath(mapName)));;
      magesToSpawn--;
      mageSpawnTimer = mageSpawnDelay;
    }
  }

  // goblin spawning
  spawnCooldown--;
  if (spawnCooldown <= 0 && enemiesToSpawn > 0) {
    spawnEnemy(mapName);
    enemiesToSpawn--;
    spawnCooldown = timeBetweenSpawns;
  }

  if (enemiesToSpawn === 0 && magesToSpawn === 0 && enemies.length === 0 && enemiesToAdd.length === 0) {
    waveInProgress = false;
    RewardPlayer();
    if (autoStart) {
      startWave();
    }
  }
}

function spawnEnemy(mapName) {
  if (mapName === 'map3') {
    let path = (enemies.length % 2 === 0) ? 'map3_path1' : 'map3_path2';
    spawnWithMix(path);
  } else if (mapName === 'map2') {
    let path = (enemies.length % 2 === 0) ? 'map2_path1' : 'map2_path2';
    spawnWithMix(path);
  } else {
    spawnWithMix(mapName);
  }
}

function spawnWithMix(path) {
  if (currentWave > 3 && nextGoblinIn <= 0) {
    enemies.push(new Goblin(path));
    nextGoblinIn = floor(random(1, 4));
  } else {
    enemies.push(new Slime(path));
    if (currentWave > 3) nextGoblinIn--;
  }
}

function resetWaves() {
  currentWave = 0;
  enemiesToSpawn = 0;
  spawnCooldown = 0;
  waveInProgress = false;
  magesToSpawn = 0;
  mageSpawnTimer = 0;
}