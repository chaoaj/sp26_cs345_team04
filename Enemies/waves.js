let currentWave = 0;
let enemiesToSpawn = 0;
let spawnCooldown = 0;
let timeBetweenSpawns = 60;
let waveInProgress = false;

function startWave() {
  if (waveInProgress) return;

  currentWave++;
  enemiesToSpawn = 5 + currentWave * 2;
  spawnCooldown = 0;
  waveInProgress = true;
}

function updateWaves(mapName) {
  if (!waveInProgress) return;

  spawnCooldown--;

  if (spawnCooldown <= 0 && enemiesToSpawn > 0) {
    spawnEnemy(mapName);
    enemiesToSpawn--;
    spawnCooldown = timeBetweenSpawns;
  }

  if (enemiesToSpawn === 0 && enemies.length === 0) {
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
}