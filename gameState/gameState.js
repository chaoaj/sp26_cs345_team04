let gameState = 'titleScreen'
let lastMap = ""
let spriteSheetMap2; 

let titleMusic;
let map1Music;
let map2Music;
let map3Music;
let currentMusic = null;
let buttonColor = ""

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Courier New'); 
  setupMap1();
  setup_map2_1();
  setupMap3();
  setupStore();
  genStars();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function preload() {
  preloadMap1();
  preloadMap3();
  loadGoblinSprites();
  loadMageSprites();
  loadRatSprites();
  preloadStore();
  grassCardSprite1 = loadImage('map1/game_background_4.png');
  iceCardSprite2 = loadImage('map2/game_background_3.png');
  spriteSheetMap2 = loadImage("map2/tail_set_3.png");
  lavaCardSprite = loadImage('map3/game_background_1.png');
  
  //This is for the music to funtion don't touch or I will get you
  titleMusic = loadSound("Scores/Soul Odyssey.mp3");
  map1Music = loadSound("Scores/Spring Blossoming.mp3");
  map2Music = loadSound("Scores/Mentality.mp3");
  map3Music = loadSound("Scores/Heating Up.mp3");
}

function draw() {
  if (gameState === 'titleScreen'){
    drawTitleScreen();
  } else if (gameState === 'settings'){
    drawSettings();
  }else if (gameState === 'levelSelect') {
    drawLevelSelect();
  } else if (gameState === 'map1') {
    drawMap1();
    lastMap ="map1"
    buttonColor = "green"
  } else if (gameState === 'map2'){
    drawMap2_1();
    lastMap ="map2"
    buttonColor = "lightblue"
  } else if (gameState === 'map3'){
    drawMap3();
    lastMap ="map3"
    buttonColor = "darkorange"
  } else if (gameState === 'lore') {
    drawLore();
  } else if (gameState === 'gameover') {
    drawGameOver();
  }
}

function mousePressed() {
  // This allows the music to play upon mouse interaction 
  if (currentMusic === null) {
    playMusic(titleMusic);
  }
  
  if (gameState === 'titleScreen'){
    mousePressedTitleScreen();
  } else if (gameState === 'settings'){
    mousePressedSettings();
  }else if (gameState === 'levelSelect') {
    mousePressedLevelSelect();
  } else if (gameState === 'map1') {
    mousePressedMap1();
  }
    else if (gameState === 'map2'){
      mousePressedMap2_1();
    }
    else if (gameState === 'map3'){
      mousePressedMap3_1()
    }
}

function keyPressed() {
  if (gameState === 'map1') {
    if (key === ' ' && !waveInProgress) {
      startWave();
    }
  } if (gameState === 'gameover' && key === 'Escape') {
    switchToMap(lastMap)
    
  } if(gameState ==="map3"){
    if (key === ' ' && !waveInProgress) {
      startWave();
    }
  } if (gameState === "map2"){
    if (key === ' ' && !waveInProgress) {
      startWave();
    }
  }
}

function mouseReleased() {
  if (gameState === 'map1') {
    storeMouseReleased();
  }
}

function switchToMap(mapName) {
  resetEnemies();
  resetWaves();
  clearTowers();
  playerHP = 20;
  storeOpen = false;
  gameState = mapName;
}
// Stars
let stars = [];

function genStars() {
  for (let i = 0; i < 80; i++) {
    stars.push({ x: random(width), y: random(height), size: 3 });
  }
}

function drawStars() {
  for (let s of stars) {
    fill(255);
    noStroke();
    ellipse(s.x, s.y, s.size);
  }
}

function drawMoon(sx, sy) {
  fill(210, 195, 142);
  stroke(210, 195, 142);
  circle(690 * sx, 50 * sy, 50 * sx);
  fill(0, 0, 30);
  stroke(0, 0, 30);
  circle(700 * sx, 40 * sy, 50 * sx);
}

function playMusic(song) {
  if (currentMusic !== song) {
    if (currentMusic) currentMusic.stop();
    currentMusic = song;
    currentMusic.setVolume(0.5);
    currentMusic.loop();
  }
}
