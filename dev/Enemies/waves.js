let currentWave = 0;
let enemiesToSpawn = 0;
let spawnCooldown = 0;
let timeBetweenSpawns = 60;
let waveInProgress = false;

let magesToSpawn = 0;
let mageSpawnTimer = 0;
let mageSpawnDelay = 180; 

function startWave() {
  if (waveInProgress) return;

  currentWave++;
  enemiesToSpawn = 2 + currentWave * 2;
  spawnCooldown = 0;
  waveInProgress = true;

  if (currentWave % 5 === 0) {
    magesToSpawn = currentWave / 5;
    mageSpawnTimer = 0;
  }
}

function updateWaves(mapName) {
  if (!waveInProgress) return;

  // staggered mage spawning
  if (magesToSpawn > 0) {
    mageSpawnTimer--;
    if (mageSpawnTimer <= 0) {
      enemiesToAdd.push(new Mage(mapName));
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

  if (enemiesToSpawn === 0 && magesToSpawn === 0 && enemies.length === 0) {
    waveInProgress = false;
    if (autoStart) {
      startWave();
    }
  }
}

function spawnEnemy(mapName) {
  enemies.push(new Goblin(mapName));
}

function resetWaves() {
  currentWave = 0;
  enemiesToSpawn = 0;
  spawnCooldown = 0;
  waveInProgress = false;
  magesToSpawn = 0;
  mageSpawnTimer = 0;
}