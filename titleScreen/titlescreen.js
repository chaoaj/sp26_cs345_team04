let gameState = 'titleScreen'

function setup() {
  createCanvas(640, 448);
  textFont('Courier New');  
  setupLevelSelect();
  setupMap1();
}

function drawTitleScreen() {

  push();
  background(0, 0, 30)
  fill(30, 50, 0);
  stroke(30, 50, 0);
  //grass
  rect(-1, 235, 751, 240);
  //tree
  fill(92, 51, 23);
  stroke(92, 51, 23);
  rect(27, 211, 8, 25);
  rect(600, 211, 8, 25)
  fill(0, 80, 0);
  stroke(0, 80, 0);
  rect(15, 170, 30, 50, 3);
  rect(589, 170, 30, 50, 3);
  
  // castle
  strokeWeight(3);
  fill(60, 50, 25);
  
  stroke(110, 95, 42);
  rect(60, 149, 500, 85);
  stroke(60, 50, 25);
  rect(60, 204, 500, 30);
  for (let x = 75; x < 505; x += 50) {
    rect(x, 136, 25, 40);
  }

  fill(85, 65, 30);
  stroke(110, 95, 42);
  rect(60, 129, 70, 105);
  rect(505, 129, 70, 105);
  fill(60, 50, 25);
  rect(55, 109, 80, 20);
  rect(500, 109, 80, 20);
  fill(20);
  rect(84, 160, 24, 40, 30, 30, 0, 0);
  rect(528, 160, 24, 40, 30, 30, 0, 0);
  rect(280, 160, 75, 75, 50, 50, 0, 0);

  // title bar
  fill(0);
  rect(115, 35, 410, 90);
  textSize(35);
  fill(110, 95, 42);

  rect(123, 46, 1)
  rect(125, 48, 1)
  rect(121, 48, 1)
  rect(123, 50, 1)

  rect(123 + 385, 46, 1)
  rect(125 + 385, 48, 1)
  rect(121 + 385, 48, 1)
  rect(123 + 385, 50, 1)
  textFont('Courier New');
  text("SCARY TOWER", 203, 76);
  textSize(25)
  text("D E F E N C E", 220, 110);

  //moon
  fill(210, 195, 142);
  stroke(210, 195, 142);
  circle(690, 50, 50);
  fill(0, 0, 30);
  stroke(0, 0, 30);
  circle(700, 40, 50);

  // stars
  

  // buttons

  strokeWeight(2);
  fill(200, 150, 2);
  stroke(100, 75, 22)
  rect(280 - 50, 170, 175, 40);
  textSize(18)
  fill(0);
  text("PLAY", 347 - 50, 195);

  
  rect(280 - 50, 220, 70, 20);
  textSize(10);
  fill(200);
  text("Settings", 292 - 50, 233)

  fill(0);
  rect(390 - 50, 220, 65, 20)
  fill(200);
  text("LORE", 410 - 50, 233)

  pop();

}

function mousePressedTitleScreen(){
  if (mouseX > 230 && mouseX < 405 && mouseY > 170 && mouseY < 210) {
    gameState = 'levelSelect';
    return;
  }
  if (mouseX > 230 && mouseX < 300 && mouseY > 220 && mouseY < 240) {
    gameState = 'settings';
  }
}
