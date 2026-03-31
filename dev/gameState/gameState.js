let gameState = 'titleScreen'

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Courier New');  
  genStars();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  if (gameState === 'titleScreen'){
    drawTitleScreen();
  } else if (gameState === 'settings'){
    drawSettings();
  }else if (gameState === 'levelSelect') {
    drawLevelSelect();
  } else if (gameState === 'map1') {
    setupMap1();
    drawMap1();
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

function makeStars(){

  for (let s of stars) {
    fill(255)
    noStroke();
    ellipse(s.x, s.y, s.size);
  }
}

