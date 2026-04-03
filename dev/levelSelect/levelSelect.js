function drawLevelSelect() {
  let sy = height / 448

  background(0, 0, 30);
  drawStars();
  drawMoon(sy, sy);

  // ground
  fill(30, 50, 0);
  noStroke();
  rect(0, height * 0.82, width, height * 0.18);
  

  // title banner
  fill(10, 20, 50, 220);
  stroke(180, 150, 60);
  strokeWeight(3);
  rect(width/2 - 160*sy, 18*sy, 320*sy, 66*sy, 6);
  noStroke();
  fill(220, 185, 60);
  textSize(24*sy);
  textStyle(BOLD);
  text('SELECT LEVEL', width/2 - textWidth('SELECT LEVEL')/2, 48*sy);
  fill(180, 160, 100);
  textSize(9*sy);
  text('C H O O S E   Y O U R   B A T T L E F I E L D', width/2 - textWidth('C H O O S E   Y O U R   B A T T L E F I E L D')/2, 68*sy);

  // GRASS CARD
  let grassx = width/2 - 175*sy;
  let grassy = height * 0.28;
  let grassw = 150*sy;
  let grassh = 210*sy;
  drawLevelCard(grassx, grassy, grassw, grassh, 40, 100, 40, 80, 160, 60);
  image(grassCardSprite1, grassx - grassw/2, grassy, grassw, grassh * 0.58);
  // grass label
  fill(140, 255, 140);
  textSize(14*sy);
  textStyle(BOLD);
  noStroke();
  text('GRASS', grassx - textWidth('GRASS')/2, grassy + grassh * 0.65);
  fill(200, 180, 140);
  textSize(8*sy);
  textStyle(NORMAL);
  text('EASY', grassx - textWidth('EASY')/2, grassy + grassh * 0.78);

  // grass dots 
  fill(80, 200, 80);
  ellipse(grassx - 14*sy, grassy + grassh * 0.9, 9*sy, 9*sy);
  fill(80, 80, 80);
  ellipse(grassx, grassy + grassh * 0.9, 9*sy, 9*sy);
  ellipse(grassx + 14*sy, grassy + grassh * 0.9, 9*sy, 9*sy);

  // ICE CARD
  let icex = width/2;
  let icey = height * 0.28 - 14*sy;
  let icew = 164*sy;
  let iceh = 224*sy;
  drawLevelCard(icex, icey, icew, iceh, 100, 160, 220, 180, 200, 255);

  // ice image here
  
  // ice label
  fill(140, 200, 255);
  textSize(14*sy);
  textStyle(BOLD);
  noStroke();
  text('ICE', icex - textWidth('ICE')/2, icey + iceh * 0.65);
  fill(200, 180, 140);
  textSize(8*sy);
  textStyle(NORMAL);
  text('MEDIUM', icex - textWidth('MEDIUM')/2, icey + iceh * 0.78);

  // ice dots
  fill(80, 160, 255);
  ellipse(icex - 14*sy, icey + iceh * 0.9, 9*sy, 9*sy);
  ellipse(icex, icey + iceh * 0.9, 9*sy, 9*sy);
  fill(80, 80, 80);
  ellipse(icex + 14*sy, icey + iceh * 0.9, 9*sy, 9*sy);

  // LAVA CARD
  let lavax = width/2 + 175*sy;
  let lavay = height * 0.28;
  let lavaw = 150*sy;
  let lavah = 210*sy;
  drawLevelCard(lavax, lavay, lavaw, lavah, 120, 40, 20, 200, 80, 20);

  //lava image here

  // lava label
  fill(255, 140, 80);
  textSize(14*sy);
  textStyle(BOLD);
  noStroke();
  text('LAVA', lavax - textWidth('LAVA')/2, lavay + lavah * 0.65);
  fill(200, 180, 140);
  textSize(8*sy);
  textStyle(NORMAL);
  text('HARD', lavax - textWidth('HARD')/2, lavay + lavah * 0.78);

  // lava dots
  fill(220, 80, 30);
  ellipse(lavax - 14*sy, lavay + lavah * 0.9, 9*sy, 9*sy);
  ellipse(lavax, lavay + lavah * 0.9, 9*sy, 9*sy);
  ellipse(lavax + 14*sy, lavay + lavah * 0.9, 9*sy, 9*sy);

  fill(160, 160, 180, 180);
  textSize(10*sy);
  textStyle(NORMAL);
  noStroke();
  let hint = 'GRASS  ·  ICE  ·  LAVA';
  text(hint, width/2 - textWidth(hint)/2, height - 12*sy);

  // back button
  fill(40, 60, 120, 220);
  stroke(100, 130, 200);
  strokeWeight(2);
  rect(width/2 - 66*sy, height - 60*sy, 132*sy, 32*sy, 5);
  fill(255);
  noStroke();
  textSize(12*sy);
  text('<-- BACK', width/2 - textWidth('<-- BACK')/2, height - 40*sy);
}

// logic for card
function drawLevelCard(cx, cy, cw, ch, r, g, b, br, bg, bb) {

  noStroke();
  fill(r*0.5, g*0.5, b*0.5);
  rect(cx - cw/2, cy, cw, ch);
  fill(r*0.3, g*0.3, b*0.3, 230);
  rect(cx - cw/2, cy + ch * 0.58, cw, ch * 0.42);
  stroke(br, bg, bb);
  rect(cx - cw/2, cy, cw, ch);
  
}

// INPUT 
function mousePressedLevelSelect() {
  let sy = height / 448

  // back button
  if (mouseX > width/2 - 66*sy && mouseX < width/2 + 66*sy && mouseY > height - 60*sy && mouseY < height - 28*sy) {
    gameState = 'titleScreen';
    return;
  }

  // grass card
  let grassx = width/2 - 175*sy;
  let grassy = height * 0.28;
  let grassw = 150*sy;
  let grassh = 210*sy;
  if (mouseX > grassx - grassw/2 && mouseX < grassx + grassw/2 && mouseY > grassy && mouseY < grassy + grassh) {
    gameState = 'map1';
    return;
  }

  // ice card
  let icex = width/2;
  let icey = height * 0.28 - 14*sy;
  let icew = 164*sy;
  let iceh = 224*sy;
  if (mouseX > icex - icew/2 && mouseX < icex + icew/2 && mouseY > icey && mouseY < icey + iceh) {
    gameState = 'map2';
    return;
  }

  // lava card
  let lavax = width/2 + 175*sy;
  let lavay = height * 0.28;
  let lavaw = 150*sy;
  let lavah = 210*sy;
  if (mouseX > lavax - lavaw/2 && mouseX < lavax + lavaw/2 && mouseY > lavay && mouseY < lavay + lavah) {
    // gameState = 'map3';
    return;
  }
}
