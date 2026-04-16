// original canvas size: 640 x 448

let spriteSheet;
let grass_horizontalPath;
let tileWidth = 64; 
let tileHeight = 64;
let storeOpen = false;



function preloadMap1() {
grass_spriteSheet = loadImage("map1/tail_set_4.png");
spriteSheet2 = loadImage("map1/game_background_4.png");

}

function preloadStore() {
  tower1 = loadImage('Towers/t1.png');
  tower2 = loadImage('Towers/t2.png');
  tower3 = loadImage('Towers/t3.png');
  tower4 = loadImage('Towers/t4.png');
  tower5 = loadImage('Towers/t5.png');
  tower6 = loadImage('Towers/t6.png');
  tower7 = loadImage('Towers/t7.png');
  tower8 = loadImage('Towers/t8.png');
  tower9 = loadImage('Towers/17.png');
}

function setupMap1() {
grass_horizontalPath = grass_spriteSheet.get(70, 410, 150, 100);       
grass_corner2 = grass_spriteSheet.get(230, 67,160,140)
grass_verticalPath = grass_spriteSheet.get(300, 570, 120, 120);
grass_corner3 = grass_spriteSheet.get(75,250,130,140);
grass_corner4 = grass_spriteSheet.get(230,205,158,158);
grass_corner1 = grass_spriteSheet.get(67,61,150,135);
house = grass_spriteSheet.get(810,125,240,240);
bigTree = grass_spriteSheet.get(800,400,250,250);
grass = grass_spriteSheet.get(900,760,70,100);
  
  
  
makeTransparentPath(grass_horizontalPath);
makeTransparentPath(grass_corner2);
makeTransparentPath(grass_verticalPath);
makeTransparentPath(grass_corner3);
makeTransparentPath(grass_corner4);
makeTransparentPath(grass_corner1);
cleanDecor(grass);
cleanDecor(house);
cleanDecor(bigTree);
house = autoCrop(house);
bigTree = autoCrop(bigTree);
grass = autoCrop(grass)

}

<<<<<<< HEAD
function setupStore() {
  createCanvas(300, 400);
}

function drawStore1() {
  fill(0, 0, 0, 150);
  rect(1050, 0, 550, 1000);
  textFont('Courier New');
  fill('white');
  
  // Tower set 1
  image(tower1, 0, 5, 85, 85);
  image(tower2, 105, 5, 85, 85);
  image(tower3, 210, 5, 85, 85);
  
  fill('white');               
  textSize(20);      
  text("$100", 10, 110);
  text("$150", 115, 110);
  text("$200", 220, 110);
  
  // Tower set 2
  image(tower4, 0, 125, 85, 85);
  image(tower6, 105, 125, 85, 85);
  image(tower5, 210, 125, 85, 85);
  
  fill('white');           
  textSize(20);     
  text("$100", 10, 235);
  text("$150", 115, 235);
  text("$200", 220, 235);
  
  // Tower set 3
  image(tower7, 0, 245, 85, 85);
  image(tower8, 105, 245, 85, 85);
  image(tower9, 210, 245, 85, 85);
  
  text("$100", 10, 355);
  text("$150", 115, 355);
  text("$200", 220, 355);
}
=======

// function drawStore() {
//   rect(width - 350, 0, 350, height);
// }

function drawStore() {
  fill("gray")
  rect(width - 350, 0, 350, height);

  fill("white");
  square(width - 340, 10, 50);
  fill("black")
  text("level", width - 340, 40)
}

>>>>>>> 09f1492930c8b02cf4a2d60827548a34d06c4649

function drawMap1() {
  let sx = width / 640;
  let sy = height / 448;
  background(50,65,30);
 
  for (let x = 0; x < width; x += 20) {
  for (let y = 0; y < height; y += 20) {
   image(grass, x, y, 30, 30);
  }
}


  
 let density = 35*sx; 

// --- TOP & BOTTOM ---
for (let x = 0; x < width; x += density) {
  // TOP: Skip the house AND the top curve (around x = 225-300)
  // Your corner1/corner2 are at the top, so we clear that space.
  if ((x < 210*sx || x > 350*sx)) {
    image(bigTree, x, -20, 80*sx, 80*sy); 
  }

  // BOTTOM: Skip the two curves at the bottom (x ~ 120 and x ~ 340)
  // We create two "gates" at the bottom for the corners to breathe.
  let nearFirstBottomCurve = (x > 80*sx && x < 240*sx);
  let nearSecondBottomCurve = (x > 300*sx && x < 440*sx);
  
  if (!nearFirstBottomCurve && !nearSecondBottomCurve) {
    image(bigTree, x, height - 70*sy, 80*sx, 80*sy);
  }
}

// --- SIDES (The "Gate" Logic) ---
for (let y = 0; y < height; y += density) {
  // LEFT SIDE: Skip entrance
  if (y < 140*sy || y > 220*sy) {
    image(bigTree, -20, y, 80*sx, 80*sy);
  }

  // RIGHT SIDE: Skip exit
  if (y < 130*sy || y > 210*sy) {
    image(bigTree, width - 60, y, 80*sx, 80*sy);
  }
}
  

  for (let i = 0; i < 2; i++) {
    // The X position must be exactly i * tileWidth
    let x = i * tileWidth; 
    let y = 200;
    // Draw the image at exactly tileWidth
    image(grass_horizontalPath, 0, 197*sy, 80*sx, 50*sy);
  }
  image(grass_corner2,80*sx,200*sy ,100*sx, 75*sy)
  image(grass_verticalPath,95.5*sx,261.5*sy ,77*sx, 65*sy)
  image(grass_verticalPath,95.5*sx,318.5*sy ,77*sx, 65*sy)
  image(grass_corner3,120*sx,383*sy,80*sx,70*sy)
  image(grass_corner4,200*sx,360*sy,80*sx,78*sy)
  image(grass_verticalPath,206*sx,318.5*sy ,67*sx, 65*sy)
  image(grass_verticalPath,206*sx,253.5*sy ,67*sx, 65*sy)
  image(grass_verticalPath,206*sx,188.5*sy,67*sx,65*sy)
  image(grass_verticalPath,206*sx,124.5*sy,67*sx, 65*sy)
  image(grass_verticalPath,206*sx,60*sy,67*sx, 65*sy)
  image(grass_corner1,225*sx,0,85*sx,65*sy)
  image(grass_corner2,305*sx,3*sy,85*sx,68*sy)
  image(grass_verticalPath,318*sx,68*sy,65*sx, 80*sy)
  image(grass_verticalPath,318*sx,124.5*sy,65*sx,80*sy)
  image(grass_verticalPath,318*sx,204*sy,65*sx, 80*sy)
  image(grass_verticalPath,318*sx,283*sy,65*sx, 100*sy)
  image(grass_corner3,338*sx,380*sy,71*sx,80*sy)
  image(grass_corner4,409*sx,353*sy,85*sx,92*sy)
  image(grass_verticalPath,423*sx,264*sy,67*sx,100*sy)
  image(grass_corner1,443*sx,185*sy,80*sx,80*sy)
  image(grass_horizontalPath,519*sx,180*sy,150*sx,62*sy)
  image(house,25*sx,25*sy,150*sx,150*sy)
//  image(bigTree,500,50,100,100)
 // image(bigTree, 150, 10, 90, 90);
  //image(bigTree, 450, 10, 80, 80);
  //image(bigTree, 540, 30, 100, 100);
  
//image(bigTree, 375, 200, 85, 85);
//image(bigTree, 500, 150, 90, 90);
//image(bigTree, 60, 360, 80, 80);
//image(bigTree, 200, 380, 85, 85);
//image(bigTree, 450, 350, 90, 90);
//image(bigTree, 520, 320, 100, 100);

updateEnemies(sx, sy, 'map1'); // ← add this
drawEnemies(sx, sy);           // ← add this

if (storeOpen) {
  drawStore1();
}

drawStoreButton();

// fill("green");
// square(width - 61, 10, 50,)
// fill("white");
// textSize(17)
// text("STORE", width - 61, 40);

}

function drawStoreButton() {
  let btnX = width - 61;
  let btnY = 10;
  let btnSize = 50;

  fill("green");
  square(btnX, btnY, btnSize);

  fill("white");
  textSize(17);
  text("STORE", btnX, btnY + 30);
}

function mousePressedMap1() {
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
  // if (mouseX > width - 60 && mouseX < width - 10 && mouseY > 10 && mouseY < 60) {
  //   if (storeOpen == false) {
  //     storeOpen = true
  //     drawStore();
  //   } else {
  //     storeOpen = false
  //   }
  // }
}

function makeTransparentPath(img) {
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];
    
    // THE NUCLEAR OPTION:
    // If Red and Green are both very low, it's definitely the "background" of the sprite.
    // Most paths have at least some Red/Brown in them.
    if (r < 60 && g < 60 && b < 60) { 
      img.pixels[i + 3] = 0; 
    }
  }
  img.updatePixels();
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

    // 🎯 Compare to background color
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

function autoCrop(img) {
  img.loadPixels();

  let minX = img.width;
  let minY = img.height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let i = (x + y * img.width) * 4;
      let alpha = img.pixels[i + 3];

      if (alpha > 0) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Crop to bounding box
  return img.get(minX, minY, maxX - minX + 1, maxY - minY + 1);
}
