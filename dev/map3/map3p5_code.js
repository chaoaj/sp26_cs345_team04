function preloadMap3() {
spriteSheetMap3 = loadImage("map3/tail_set_1.png");
}
let spriteSheetMap3;
let fire_corner1, fire_corner2, fire_corner3, fire_corner4;
let fire_verticalPath, fire_horizontalPath, fire_mark;
let fire_burnedHouse, fire_split, fire_largeCrack, fire_bigRock;
let MAP_WIDTH = 710;
let MAP_HEIGHT = 750;
function setupMap3() {
  //createCanvas(windowWidth, windowHeight);
  fire_corner1 = spriteSheetMap3.get(70,64,220,215)
  fire_corner2 = spriteSheetMap3.get(300,64,200,215)
  fire_corner3 = spriteSheetMap3.get(70,290,215,215)
  fire_corner4 = spriteSheetMap3.get(300,290,215,195)
  fire_verticalPath = spriteSheetMap3.get(420,750,150,230)
  fire_horizontalPath = spriteSheetMap3.get(590,830,220,130)
  fire_mark = spriteSheetMap3.get(1330,660,80,70)
  fire_burnedHouse = spriteSheetMap3.get(1540,400,220,150)
  fire_split = spriteSheetMap3.get(520,50,420,420)
  fire_largeCrack = spriteSheetMap3.get(1040,80,440,580)
  fire_bigRock = spriteSheetMap3.get(1100,870,300,300)
  cleanDecor(fire_horizontalPath)
  cleanDecor(fire_corner1)
  cleanDecor(fire_corner2)
  cleanDecor(fire_corner4)
  cleanDecor(fire_verticalPath)
  cleanDecor(fire_split)
  cleanDecor(fire_mark)
  cleanDecor(fire_largeCrack)
  cleanDecor(fire_burnedHouse)
  cleanDecor(fire_bigRock)
  
}





function drawMap3() {
  background(43, 27, 23);

  let s = min(width / MAP_WIDTH, height / MAP_HEIGHT);
  let scaleX = width / MAP_WIDTH;
  let scaleY = height / MAP_HEIGHT;
  push();
  //translate(width / 2, height / 2);
  scale(scaleX, scaleY);
  drawPlacedTowers();
  drawDraggingTower();
  //translate(-MAP_WIDTH / 2, -MAP_HEIGHT / 2);
  drawMap3_1();
  pop();
  if(storeOpen) {
    drawStore();
  }
  drawStoreButton();

  fill(255);
  textSize(20);
  text("HP: " + playerHP, 20, 20);
  text("Wave: " + currentWave, 20, 50);
  text("Money: $" + money, 20, 80);

  if (!waveInProgress) {
    text("Press SPACE to start wave", width / 2 - 120, 40);
  }

  drawPlacedTowers();
  drawDraggingTower();
  updateWaves('map3');
  updateEnemies();          
  drawEnemies(scaleX, scaleY); 
  updateTowers();           
  drawPlacedTowersWithPlatforms(); 
  drawProjectiles();       
  drawDraggingTower();     
}

function drawMap3_1() {
  fill(43, 27, 23);
  noStroke();
  rect(0, 0, MAP_WIDTH, MAP_HEIGHT);  
  image(fire_horizontalPath,0,100,120,70)
  image(fire_horizontalPath,0,500,120,70)
  image(fire_horizontalPath,110,100,90,70)
  image(fire_horizontalPath,110,500,90,70)
  image(fire_corner2,190,100,100,115)
  image(fire_corner4,194,453,100,115)
  image(fire_verticalPath,223,195,71,300)
  image(fire_split,270,260,250,250)
  image(fire_verticalPath,430,-20,85,315)
  image(fire_horizontalPath,430,433,300,78)
  image(fire_largeCrack,290,-20,130,300)
  image(fire_burnedHouse,20,570,150,150)
  image(fire_mark, 150, 220, 60, 50);
  image(fire_mark, 40, 350, 60, 50);
  image(fire_mark, 580, 40, 60, 50);
  image(fire_mark, 120, 450, 60, 50);
  image(fire_mark, 620, 300, 60, 50);
  image(fire_mark, 900, 320, 60, 50); 
  image(fire_mark, 380, 650, 60, 50); 
  image(fire_mark, 1100, 700, 60, 50);
}

function mousePressedMap3_1() {
  let btnX = width - 61;
  let btnY = 10;
  let btnSize = 50;

  square(btnX, btnY, btnSize);

  

  if (
    mouseX > btnX &&
    mouseX < btnX + btnSize &&
    mouseY > btnY &&
    mouseY < btnY + btnSize
  ) {
    storeOpen = !storeOpen;
    console.log("toggled store:", storeOpen);
  }

  
  
  storeMousePressed();
}

function mouseReleased3() {
  storeMouseReleased();
}

function cleanDecor(img) {
  img.loadPixels();

  let w = img.width;
  let h = img.height;

  // 🎯 Get background color (top-left)
  let bgR = img.pixels[0];
  let bgG = img.pixels[1];
  let bgB = img.pixels[2];

  let visited = new Set();
  let stack = [];

  // 🎯 Start from ALL edges (not just one corner)
  for (let x = 0; x < w; x++) {
    stack.push([x, 0]);
    stack.push([x, h - 1]);
  }
  for (let y = 0; y < h; y++) {
    stack.push([0, y]);
    stack.push([w - 1, y]);
  }

  while (stack.length > 0) {
    let [x, y] = stack.pop();
    let key = x + "," + y;

    if (visited.has(key)) continue;
    visited.add(key);

    let i = (x + y * w) * 4;

    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];

    let dist = abs(r - bgR) + abs(g - bgG) + abs(b - bgB);

    if (dist < 40) {
      // Make transparent
      img.pixels[i + 3] = 0;

      // Spread to neighbors
      if (x > 0) stack.push([x - 1, y]);
      if (x < w - 1) stack.push([x + 1, y]);
      if (y > 0) stack.push([x, y - 1]);
      if (y < h - 1) stack.push([x, y + 1]);
    }
  }

  img.updatePixels();
}
