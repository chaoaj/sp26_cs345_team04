function drawTitleScreen() {
  rectMode(CORNER);
  // orignal canvas size
  // 750 x 400 
  let sx = width/750
  let sy = height/400

  background(0, 0, 30)

  //stars
  drawStars();
  drawMoon(sx, sy);

  //grass
  fill(30, 50, 0);
  stroke(30, 50, 0);
  rect(0, 235 * sy, width, height);

  //tree
  fill(92, 51, 23);
  stroke(92, 51, 23);
  rect(40*sx, 211*sy, 12*sx, 25*sy);
  rect(700*sx, 211*sy, 12*sx, 25*sy)
  fill(0, 80, 0);
  stroke(0, 80, 0);
  rect(28*sx, 170*sy, 36*sx, 50*sy, 3);
  rect(688*sx, 170*sy, 36*sx, 50*sy, 3);
  
  // castle
  strokeWeight(3);
  fill(60, 50, 25);
  
  stroke(110, 95, 42);
  rect(75*sx, 149*sy, 600*sx, 85*sy);
  stroke(60, 50, 25);
  rect(75*sx, 204*sy, 600*sx, 30*sy);
  for (let x = 75; x < 605; x += 50) {
    rect(x*sx, 136*sy, 25*sx, 40*sy);
  }

  fill(85, 65, 30);
  stroke(110, 95, 42);
  rect(75*sx, 129*sy, 70*sx, 105*sy);
  rect(605*sx, 129*sy, 70*sx, 105*sy);
  fill(60, 50, 25);
  rect(70*sx, 109*sy, 80*sx, 20*sy);
  rect(600*sx, 109*sy, 80*sx, 20*sy);
  fill(20);
  rect(98*sx, 160*sy, 24*sx, 40*sy, 30*sx, 30*sy, 0, 0);
  rect(628*sx, 160*sy, 24*sx, 40*sy, 30*sx, 30*sy, 0, 0);
  rect(330*sx, 160*sy, 75*sx, 75*sy, 50*sx, 50*sy, 0, 0);

  // title bar
  fill(0);
  rect(170*sx, 35*sy, 410*sx, 90*sy);
  fill(110, 95, 42);

  rect(180*sx, 46*sy, sx, sy)
  rect(182*sx, 48*sy, sx, sy)
  rect(178*sx, 48*sy, sx, sy)
  rect(180*sx, 50*sy, sx, sy)

  rect((180 + 385)*sx, 46*sy, sx, sy)
  rect((182 + 385)*sx, 48*sy, sx, sy)
  rect((178 + 385)*sx, 48*sy, sx, sy)
  rect((180 + 385)*sx, 50*sy, sx, sy)
  textFont('Courier New');
  textSize(75);
  text("SCARY TOWER", 253*sx, 76*sy);
  textSize(45)
  text("DEFENCE", 320*sx, 110*sy);
  

  // buttons

  strokeWeight(2);
  fill(200, 150, 2);
  stroke(100, 75, 22)
  rect(280*sx, 170*sy, 175*sx, 40*sy);
  textSize(35);
  fill(0);
  text("PLAY", 347*sx, 195*sy);

  
  rect(280*sx, 220*sy, 70*sx, 20*sy);
  textSize(20);
  fill(200);
  text("Settings", 292*sx, 233*sy)

  fill(0);
  rect(390*sx, 220*sy, 65*sx, 20*sy)
  fill(200);
  text("LORE", 410*sx, 233*sy)

}

function mousePressedTitleScreen(){
  let sx = width/750
  let sy = height/400

  if (mouseX > 280*sx && mouseX < 455*sx && mouseY > 170*sy && mouseY < 210*sy) {
    gameState = 'levelSelect';
    return;
  }
  if (mouseX > 280*sx && mouseX < 350*sx && mouseY > 220*sy && mouseY < 240*sy) {
    gameState = 'settings';
    return;
  }
}
