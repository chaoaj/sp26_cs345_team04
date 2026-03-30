let gameState = 'titleScreen'

function setup() {
  createCanvas(640, 448);
  textFont('Courier New');  
  setupLevelSelect();
  setupMap1();
}

function drawTitleScreen() {

  background(0, 0, 30)
  fill(30, 50, 0);
  stroke(30, 50, 0);
  //grass
  rect(-1, 235, 751, 200);
  //tree
  fill(92, 51, 23);
  stroke(92, 51, 23);
  rect(40, 211, 12, 25);
  rect(700, 211, 12, 25)
  fill(0, 80, 0);
  stroke(0, 80, 0);
  rect(28, 170, 36, 50, 3);
  rect(688, 170, 36, 50, 3);
  
  // castle
  strokeWeight(3);
  fill(60, 50, 25);
  
  stroke(110, 95, 42);
  rect(75, 149, 600, 85);
  stroke(60, 50, 25);
  rect(75, 204, 600, 30);
  for (let x = 75; x < 605; x += 50) {
    rect(x, 136, 25, 40);
  }

  fill(85, 65, 30);
  stroke(110, 95, 42);
  rect(75, 129, 70, 105);
  rect(605, 129, 70, 105);
  fill(60, 50, 25);
  rect(70, 109, 80, 20);
  rect(600, 109, 80, 20);
  fill(20);
  rect(98, 160, 24, 40, 30, 30, 0, 0);
  rect(628, 160, 24, 40, 30, 30, 0, 0);
  rect(330, 160, 75, 75, 50, 50, 0, 0);

  // title bar
  fill(0);
  rect(170, 35, 410, 90);
  textSize(35);
  fill(110, 95, 42);

  rect(180, 46, 1)
  rect(182, 48, 1)
  rect(178, 48, 1)
  rect(180, 50, 1)

  rect(180 + 385, 46, 1)
  rect(182 + 385, 48, 1)
  rect(178 + 385, 48, 1)
  rect(180 + 385, 50, 1)
  textFont('Courier New');
  text("SCARY TOWER", 253, 76);
  textSize(25)
  text("D E F E N C E", 270, 110);

  //moon
  fill(210, 195, 142);
  stroke(210, 195, 142);
  circle(690, 50, 50);
  fill(0, 0, 30);
  stroke(0, 0, 30);
  circle(700, 40, 50);

  // stars
  strokeWeight(1);
  fill(255, 255, 255);
  stroke(255, 255, 255);
  circle(50, 50, 1);
  circle(100, 60, 1);
  circle(150, 20, 1);
  circle(20, 200, 1);
  circle(10, 130, 1);
  circle(450, 10, 1);
  circle(350, 18, 1);
  circle(630, 90, 1);
  circle(730, 10, 1);

  // buttons

  strokeWeight(2);
  fill(200, 150, 2);
  stroke(100, 75, 22)
  rect(280, 170, 175, 40);
  textSize(18)
  fill(0);
  text("PLAY", 347, 195);

  
  rect(280, 220, 70, 20);
  textSize(10);
  fill(200);
  text("Settings", 292, 233)

  fill(0);
  rect(390, 220, 65, 20)
  fill(200);
  text("LORE", 410, 233)

}

function mousePressedTitleScreen(){
  if (mouseX > 280 && mouseX < 455 && mouseY > 170 && mouseY < 210) {
    gameState = 'levelSelect';
    return;
  }
  if (mouseX > 280 && mouseX < 350 && mouseY > 220 && mouseY < 240) {
    gameState = 'settings';
  }
}
