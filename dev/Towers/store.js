function setupStore() {
  
}

function drawStore() {
  push();
  fill(0, 0, 0, 200);
  rect(width - 320, 0, 320, height);
  
  translate(width - 320, 0);
  textFont('Courier New');
  fill('white');
  textSize(14);
  text("-- TOWERS --", 90, 30);

  // tier 1 of each chain
  image(tower1, 10,  45, 85, 85);
  image(tower4, 110, 45, 85, 85);
  image(tower7, 210, 45, 85, 85);
  
  fill('white');
  textSize(16);
  text("$100", 20,  140);
  text("$100", 120, 140);
  text("$100", 220, 140);

  pop();
}

function preloadStore() {
  tower1 = loadImage("Towers/t1.png");
  tower2 = loadImage("Towers/t2.png");
  tower3 = loadImage("Towers/t3.png");
  tower4 = loadImage("Towers/t4.png");
  tower5 = loadImage("Towers/t5.png");
  tower6 = loadImage("Towers/t6.png");
  tower7 = loadImage("Towers/t7.png");
  tower8 = loadImage("Towers/t8.png");
  tower9 = loadImage("Towers/t9.png");
}
