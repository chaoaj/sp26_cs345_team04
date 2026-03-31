//orignal canvas size: 640 x 448

const levels = [
  { id: 'grass', label: 'GRASS', diff: 'EASY',   dots: 1, dotColor: [80,200,80],   cardColor: [40,100,40],   borderColor: [80,160,60]   },
  { id: 'ice',   label: 'ICE',   diff: 'MEDIUM',  dots: 2, dotColor: [80,160,255],  cardColor: [100,160,220], borderColor: [180,200,255] },
  { id: 'lava',  label: 'LAVA',  diff: 'HARD',    dots: 3, dotColor: [220,80,30],   cardColor: [120,40,20],   borderColor: [200,80,20]   },
];

function preload() {
  preloadMap1();
  grassCardSprite1 = loadImage('map1/game_background_4.png')
  // add sprites here
}


// ─── LEVEL SELECT ─────────────────────────────────────────────────────────────
function drawLevelSelect() {
  background(0, 0, 30);

  makeStars();

  fill(30, 50, 0);
  noStroke();
  rect(0, height * 0.72, width, height * 0.28);

  drawTitleBanner();

  // cards
  let cardW = 150, cardH = 210;
  let cardY = height / 2 - cardH / 2 + 20;
  let positions = [width/2 - 175, width/2, width/2 + 175];

  for (let i = 0; i < 3; i++) {
    let cx = positions[i];
    let isCenter = i === 1;
    let cw = isCenter ? cardW + 14 : cardW;
    let ch = isCenter ? cardH + 14 : cardH;
    let cy = isCenter ? cardY - 14 : cardY + 8;
    drawCard(levels[i], cx, cy, cw, ch, isCenter);
  }

  fill(160, 160, 180, 180);
  textSize(10);
  textAlign(CENTER);
  noStroke();
  text('GRASS  ·  ICE  ·  LAVA', width / 2, height - 12);

  drawBackButton();
}

function drawTitleBanner() {
  let bx = width/2 - 160, by = 18, bw = 320, bh = 66;
  stroke(180, 150, 60);
  strokeWeight(3);
  fill(10, 20, 50, 220);
  rect(bx, by, bw, bh, 6);



  noStroke();
  fill(220, 185, 60);
  textSize(24);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text('SELECT LEVEL', width/2, by + 26);

  fill(180, 160, 100);
  textSize(9);
  textStyle(NORMAL);
  text('C H O O S E   Y O U R   B A T T L E F I E L D', width/2, by + 50);
}

function drawCard(level, cx, cy, cw, ch, isCenter) {
  let [r,g,b] = level.cardColor;
  let [br,bg,bb] = level.borderColor;
  let prevH = ch * 0.58;

  push();
  translate(cx, cy);

  noStroke();
  fill(r*0.5, g*0.5, b*0.5);
  rect(-cw/2, 0, cw, ch);

  fill(r*0.7, g*0.7, b*0.7);
  rect(-cw/2, 0, cw, prevH);
  drawCardPreview(level.id, -cw/2, 0, cw, prevH);

  fill(r*0.3, g*0.3, b*0.3, 230);
  rect(-cw/2, prevH, cw, ch - prevH);

  fill(level.dotColor[0]+60, level.dotColor[1]+60, level.dotColor[2]+60);
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(level.label, 0, prevH + 8);

  fill(200, 180, 140);
  textSize(8);
  textStyle(NORMAL);
  text(level.diff, 0, prevH + 26);

  for (let d = 0; d < 3; d++) {
    fill(d < level.dots ? level.dotColor : [80, 80, 80]);
    ellipse((d - 1) * 14, prevH + 40, 9, 9);
  }

  noFill();
  stroke(br, bg, bb);
  strokeWeight(isCenter ? 3 : 2);
  rect(-cw/2, 0, cw, ch);

  pop();
}

function drawCardPreview(id, x, y, w, h) {
  if (id === 'grass') {
      image(grassCardSprite1, x, y, w, h);
  } else if (id === 'ice') {
    // ice image 
  } else if (id === 'lava') {
    // lava image
  }
}

function drawBackButton() {
  let bx = width/2 - 66, by = height - 80, bw = 132, bh = 32;
  
  fill(180, 200, 255);
  textSize(12);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text('<-- BACK', width/2, by + bh/2);

  noFill();
  stroke(100, 130, 200);
  strokeWeight(2);
  rect(bx, by, bw, bh, 5);
}

// ─── INPUT ────────────────────────────────────────────────────────────────────
function mousePressed() {
  let bx = width/2 - 66, by = height - 80, bw = 132, bh = 32;
  if (gameState === 'titleScreen'){
    mousePressedTitleScreen();
    return;
  }
  if (gameState === 'settings'){
    mousePressedSettings();
    return
  }
  if (mouseX > bx && mouseX < bx+bw && mouseY > by && mouseY < by+bh) {
    gameState = 'titleScreen'
    return;
  }

  let cardW = 150, cardH = 210;
  let cardY = height / 2 - cardH / 2 + 20;
  let positions = [width/2 - 175, width/2, width/2 + 175];

  for (let i = 0; i < 3; i++) {
    let cx = positions[i];
    let isCenter = i === 1;
    let cw = isCenter ? cardW + 14 : cardW;
    let ch = isCenter ? cardH + 14 : cardH;
    let cy = isCenter ? cardY - 14 : cardY + 8;


    // Select map
    if (mouseX > cx-cw/2 && mouseX < cx+cw/2 && mouseY > cy && mouseY < cy+ch) {
      if (i === 0) {
        gameState = 'map1';
      } else if (i == 1){
        // map2
      } else if (i == 2){
        // map3
      }
    }
  }
}

