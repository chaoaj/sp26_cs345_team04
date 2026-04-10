let lake, tree, iceThing;

function setup_map2_1() {
horizontalPath = spriteSheetMap2.get(590, 980, 220, 170);       
corner2 = spriteSheetMap2.get(300, 110,205,240)
verticalPath = spriteSheetMap2.get(420, 920, 170, 250);
corner3 = spriteSheetMap2.get(80,350,205,240);
corner4 = spriteSheetMap2.get(300,350,205,240);
corner1 = spriteSheetMap2.get(80,110,205,235);
lake = spriteSheetMap2.get(1080,570,330,220);
tree = spriteSheetMap2.get(1450,500,180,300)
iceThing = spriteSheetMap2.get(1050,200,300,200)
  
  
/**/
makeTransparentPath(horizontalPath);
makeTransparentPath(corner2);
makeTransparentPath(verticalPath);
makeTransparentPath(corner3);
makeTransparentPath(corner4);
makeTransparentPath(corner1);
makeTransparentPath(lake);
makeTransparentPath(tree);
makeTransparentPath(iceThing);

}

let baseW = 640;
let baseH = 448;

function drawMap2_1() {
  let scaleX = windowWidth / baseW;
  let scaleY = windowHeight / baseH;
  let s = min(scaleX, scaleY);
  background(45,55,80);
  push();
  translate(windowWidth / 2, windowHeight / 2);
  scale(s);
  translate(-baseW / 2, -baseH / 2);
  drawMap2(); 
  pop();
}

function drawMap2() {
  drawTrees()
  image(horizontalPath,-10,5,110,70);
  image(horizontalPath,-10,300,110,70);
  image(horizontalPath,278,5,105,70);
  image(horizontalPath,274,300,105,73);
  image(verticalPath,400,75,70,250);
  image(corner2,374,5,85,100);
  image(corner4,374,275,85,100);
  image(corner2,95,300,75,100)
  image(corner3,123,387,75,100)
  image(corner4,190,387,75,100)
  image(corner1,217,300,75,100)
  image(corner4,95,-20,75,100)
  image(corner1,123,-110,75,100)
  image(corner2,193,-110,75,100)
  image(corner3,221.5,-22,75,100)
  image(horizontalPath,437,125,300,70);
  image(lake,120,120,200,200)
  image(tree,560,490,100,100)
  image(iceThing,430,-50,100,100)
  image(iceThing,35,400,100,100)

  fill("green");
  square(width - 61, 10, 50,)
  fill("white");
  text("BACK", width - 60, 40);
}

function mousePressedMap2_1() {
  if (mouseX > width - 60 && mouseX < width - 10 && mouseY > 10 && mouseY < 60) {
    gameState = 'levelSelect';
    return;
  }
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
  return img.get(minX, minY, maxX - minX + 1, maxY - minY + 1);
}









function drawTrees() {
  let ts = 110;
  let density = 30;

  let s = min(windowWidth / baseW, windowHeight / baseH);
  let visW = windowWidth / s;
  let visH = windowHeight / s;
  let minX = (baseW - visW) / 2 - 30;
  let minY = (baseH - visH) / 2 -30;
  let maxX = minX + visW +60;
  let maxY = minY + visH + 60;

  // TOP EDGE — tightened gaps
  for (let x = minX; x < maxX; x += density) {
    let nearLeftLoop  = (x > 90  && x < 225);  // tighter
    let nearTopCorner = (x > 370 && x < 460);  // tighter
    if (!nearLeftLoop) {
      image(tree, x, minY, ts, ts);
    }
  }

  // BOTTOM EDGE — tightened gap
  for (let x = minX; x < maxX; x += density) {
    let nearBottomLoop = (x > 90 && x < 260);  // tighter
      image(tree, x, maxY - ts, ts, ts);
  }

  // LEFT EDGE — tightened entrance gaps
  for (let y = minY; y < maxY; y += density) {
    let nearTopEntrance    = (y > -65   && y < 70);   // tighter
    let nearBottomEntrance = (y > 260 && y < 375);  // tighter
    if (!nearTopEntrance && !nearBottomEntrance) {
      image(tree, minX, y, ts, ts);
    }
  }

  // RIGHT EDGE — tightened exit gap
  for (let y = minY; y < maxY; y += density) {
    let nearExit = (y > 70 && y < 180);  // tighter
    if (!nearExit) {
      image(tree, maxX - ts, y, ts, ts);
    }
  }
}