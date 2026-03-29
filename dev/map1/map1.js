
let spriteSheet;
let horizontalPath;
let tileWidth = 64; // Change this to 64 if you want them smaller
let tileHeight = 64;

function preloadMap1() {
spriteSheet = loadImage('map1/tail_set_4.png');
spriteSheet2 = loadImage('map1/game_background_4.png');
}

function setupMap1() {
horizontalPath = spriteSheet.get(70, 410, 150, 100);       corner2 = spriteSheet.get(230, 67,160,140)
verticalPath = spriteSheet.get(300, 570, 120, 120);
corner3 = spriteSheet.get(75,250,130,140);
corner4 = spriteSheet.get(230,205,158,158);
corner1 = spriteSheet.get(67,61,150,135);
house = spriteSheet.get(810,125,240,240);
bigTree = spriteSheet.get(800,400,250,250);
grass = spriteSheet.get(900,760,70,100);
  
  
  
makeTransparentPath(horizontalPath);
makeTransparentPath(corner2);
makeTransparentPath(verticalPath);
makeTransparentPath(corner3);
makeTransparentPath(corner4);
makeTransparentPath(corner1);
cleanDecor(grass);
cleanDecor(house);
cleanDecor(bigTree);
house = autoCrop(house);
bigTree = autoCrop(bigTree);
grass = autoCrop(grass)
}

function drawMap1() {
  background(50,65,30);
 
  for (let x = 0; x < width; x += 20) {
  for (let y = 0; y < height; y += 20) {
    image(grass, x, y, 30, 30);
  }
}


 
  
  
  
 let density = 35; 

// --- TOP & BOTTOM ---
for (let x = 0; x < width; x += density) {
  // TOP: Skip the house AND the top curve (around x = 225-300)
  // Your corner1/corner2 are at the top, so we clear that space.
  if ((x < 210 || x > 350)) {
    image(bigTree, x, -20, 80, 80); 
  }

  // BOTTOM: Skip the two curves at the bottom (x ~ 120 and x ~ 340)
  // We create two "gates" at the bottom for the corners to breathe.
  let nearFirstBottomCurve = (x > 80 && x < 240);
  let nearSecondBottomCurve = (x > 300 && x < 440);
  
  if (!nearFirstBottomCurve && !nearSecondBottomCurve) {
    image(bigTree, x, height - 70, 80, 80);
  }
}

// --- SIDES (The "Gate" Logic) ---
for (let y = 0; y < height; y += density) {
  // LEFT SIDE: Skip entrance
  if (y < 140 || y > 220) {
    image(bigTree, -20, y, 80, 80);
  }

  // RIGHT SIDE: Skip exit
  if (y < 130 || y > 210) {
    image(bigTree, width - 60, y, 80, 80);
  }
}
  
  
  
  
  
  
  

  for (let i = 0; i < 2; i++) {
    // The X position must be exactly i * tileWidth
    let x = i * tileWidth; 
    let y = 200;
    // Draw the image at exactly tileWidth
    image(horizontalPath, 0, 197, 80, 50);
  }
  image(corner2,80,200 ,100, 75)
  image(verticalPath,95.5,261.5 ,77, 65)
  image(verticalPath,95.5,318.5 ,77, 65)
  image(corner3,120,383,80,70)
  image(corner4,200,360,80,78)
  image(verticalPath,206,318.5 ,67, 65)
  image(verticalPath,206,253.5 ,67, 65)
  image(verticalPath,206,188.5,67,65)
  image(verticalPath,206,124.5,67, 65)
  image(verticalPath,206,60,67, 65)
  image(corner1,225,0,85,65)
  image(corner2,305,3,85,68)
  image(verticalPath,318,68,65, 80)
  image(verticalPath,318,124.5,65,80)
  image(verticalPath,318,204,65, 80)
  image(verticalPath,318,283,65, 100)
  image(corner3,338,380,71,80)
  image(corner4,409,353,85,92)
  image(verticalPath,423,264,67,100)
  image(corner1,443,185,80,80)
  image(horizontalPath,519,180,150,62)
  image(house,25,25,150,150)
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
