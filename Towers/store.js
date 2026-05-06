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
  image(tower2, 10, 175, 85, 85);
  image(tower3, 10, 325, 85, 85);
  image(tower4, 110, 45, 85, 85);
  image(tower5, 110, 175, 85, 85);
  image(tower6, 110, 325, 85, 85);
  image(tower7, 210, 45, 85, 85);
  image(tower8, 210, 175, 85, 85);
  image(tower9, 210, 325, 85, 85);
  
  fill('white');
  textSize(16);
  text("$150", 20,  140);
  text("$150", 120, 140);
  text("$150", 220, 140);

  textSize(16);
  text("$500", 20,  300);
  text("$500", 120, 300);
  text("$500", 220, 300);

  textSize(16);
  text("$1500", 20,  450);
  text("$1500", 120, 450);
  text("$1500", 220, 450);

  fill(buttonColor);
  rect(260, height - 60, 50);
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

  // platform tops
  platformTop = [];
  platformTop[0] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/1.png");  // chain 0 t1+t2
  platformTop[1] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/1.png");
  platformTop[2] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/4.png");  // chain 0 t3
  platformTop[3] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/8.png");  // chain 1 t4+t5
  platformTop[4] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/8.png");
  platformTop[5] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/10.png"); // chain 1 t6
  platformTop[6] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/20.png"); // chain 2 t7
  platformTop[7] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/22.png"); // chain 2 t8
  platformTop[8] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/18.png"); // chain 2 t9

  // platform bottoms
  platformBot = [];
  platformBot[0] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/2.png");
  platformBot[1] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/2.png");
  platformBot[2] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/5.png");
  platformBot[3] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/9.png");
  platformBot[4] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/9.png");
  platformBot[5] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/11.png");
  platformBot[6] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/21.png");
  platformBot[7] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/23.png");
  platformBot[8] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/19.png");

  // projectiles — in-flight
  projFlight = [];
  projFlight[0] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/40.png"); // chain 0
  projFlight[1] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/35.png"); // chain 1
  projFlight[2] = loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/29.png"); // chain 2

  // projectiles — impact frames
  projImpact = [
    // chain 0: frames 41-44
    [
      loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/41.png"),
      loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/42.png"),
      loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/43.png"),
      loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/44.png"),
    ],
    // chain 1: frames 36-39
    [
      loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/36.png"),
      loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/37.png"),
      loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/38.png"),
      loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/39.png"),
    ],
    // chain 2: frames 30-34
    [
      loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/30.png"),
      loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/31.png"),
      loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/32.png"),
      loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/33.png"),
      loadImage("Sprites/Tower Sprites/Stone Tower Assets/PNG/34.png"),
    ],
  ];
}
