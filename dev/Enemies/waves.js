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
    
    RewardPlayer();
    
    if (autoStart) {
      startWave();
    }
  }

}

function spawnEnemy(mapName) {
  if (mapName === 'map3') {
    // ONLY map3 gets the split path logic
    let path = (enemies.length % 2 === 0) ? 'map3_path1' : 'map3_path2';
    enemies.push(new Goblin(path));
  } else  if( mapName === 'map2'){
    let path = (enemies.length % 2 === 0) ? 'map2_path1' : 'map2_path2';
    enemies.push(new Goblin(path));
  } else {
    // map1, map2, and any future maps go here — unchanged
    enemies.push(new Goblin(mapName));
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