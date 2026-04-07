let gameState = 'titleScreen'
let spriteSheetMap2; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Courier New'); 
  setupMap1();
  //setup_map2_1(); this nukes the entire thing
  genStars();
  
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function preload() {
  preloadMap1(); 
  grassCardSprite1 = loadImage('map1/game_background_4.png');
  iceCardSprite2 = loadImage('map2/game_background_3.png');
  spriteSheetMap2 = loadImage("map2/tail_set_3.png");
  
  // ice sprite
  // lava sprite

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
  } else if (gameState === 'map2'){
      drawMap2_1();
  } else if (gameState === 'map3'){
      // map 3
  }
}

function mousePressed() {
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
      // map 2
    }
    else if (gameState === 'map3'){
      // map 3
    }
}


// stars
let stars = [];

function genStars(){
  for (let i = 0; i < 80; i++) {
    stars.push({ x: random(width), y: random(height), size: 3 });
  }
}

function drawStars(){

  for (let s of stars) {
    fill(255)
    noStroke();
    ellipse(s.x, s.y, s.size);
  }
}

function drawMoon(sx, sy){
  fill(210, 195, 142);
  stroke(210, 195, 142);
  circle(690*sx, 50*sy, 50*sx);
  fill(0, 0, 30);
  stroke(0, 0, 30);
  circle(700*sx, 40*sy, 50*sx);

  console.log('drawing moon', sx, sy)
}

