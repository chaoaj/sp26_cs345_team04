let volumeOn = true;
let autoStart = false;

function setupSettings() {
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
}

function drawSettings() {
  drawBackground();
  drawTitle();
  drawButtons();
  textFont('Courier New');
}

function drawBackground() {
  let sx = width / 750;
  let sy = height / 400;

  background(0, 0, 30);

  drawStars();
  drawCastle(sx, sy);
  drawTrees(sx, sy);
  drawGrass(sx, sy);
  drawMoon(sx, sy);

}


function drawGrass(sx, sy) {

  fill(0, 50, 0);
  rect(width / 2, height - 40, width, 80);
  rect(0*sx, 355*sy, 2000*sx, 80*sy); 

}

function drawTrees(sx, sy) {
  let p = 13; // pixel size
  let offset = 27 * sy;

  for (let i = 0; i < width; i += 80*sx) {
    let x = i + 40*sx;
    let baseY = height - 80*sy;


    fill(80, 50, 20);
    rect(x, baseY, p, (p + 100)*sy);


    fill(20, 100, 40);


    rect(x - 2*p, baseY - 2*p - offset, p, p);
    rect(x - p,   baseY - 2*p - offset, p, p);
    rect(x,       baseY - 2*p - offset, p, p);
    rect(x + p,   baseY - 2*p - offset, p, p);
    rect(x + 2*p, baseY - 2*p - offset, p, p);


    rect(x - p, baseY - 3*p - offset, p, p);
    rect(x,     baseY - 3*p - offset, p, p);
    rect(x + p, baseY - 3*p - offset, p, p);

    rect(x, baseY - 4*p - offset, p, p);
  }
}

function drawCastle() {
  let p = 6;
  let groundY = height - 80;
  let y = groundY - 105;

  let centerX = width / 2.1;
  let spacing = 20;

  let positions = [
    centerX - 1.5 * spacing,
    centerX - 0.5 * spacing,
    centerX + 1.5 * spacing,
    centerX + 2.5 * spacing
  ];

  rectMode(CENTER);
  noStroke();

  for (let x of positions) {
    fill(80, 50, 25);
    rect(x, y, 4*p, 5*p);

    rect(x - p, y - 3*p, p, p);
    rect(x,     y - 3*p, p, p);
    rect(x + p, y - 3*p, p, p);

    rect(x - 3*p, y, 2*p, 4*p);
    rect(x + 3*p, y, 2*p, 4*p);

    rect(x - 3*p, y - 3*p, p, p);
    rect(x + 3*p, y - 3*p, p, p);

    fill(60, 30, 10);
    rect(x, y + p, p, 2*p);

    fill(0);
    rect(x, y - p, p/2, p/2);
  }
}

function drawTitle() {
  fill(200, 170, 80);
  stroke(150, 120, 50);
  strokeWeight(3);

  rect(width / 2, 80, 400, 60);

  noStroke();
  fill(240, 220, 120);
  textSize(28);
  text("SCARY TOWER SETTINGS", width / 2.57, 85);
}

function drawButtons() {
  drawToggleButton(width / 2, 170, "VOLUME", volumeOn ? "ON" : "OFF");
  drawToggleButton(width / 2, 250, "AUTOSTART", autoStart ? "ON" : "OFF");
  
  //back button
  stroke(120, 90, 40);
  strokeWeight(2);
  fill(60, 40, 20);
  rect(width / 2, 330, 300, 50);
  noStroke();
  fill(200, 170, 80);
  rect(width / 2, 330, 280, 40);
  fill(40);
  textSize(16);
  text("<-- BACK", width / 2.20, 330);
}

function drawToggleButton(x, y, label, state) {
  stroke(120, 90, 40);
  strokeWeight(3);
  fill(60, 40, 20);
  rect(x, y, 300, 50);

  noStroke();
  fill(200, 170, 80);
  rect(x, y, 280, 40);

  fill(40);
  textSize(16);
  text(label + ": " + state, x - 70, y);
}

function mousePressedSettings() {
  if (overButton(width / 2, 170)) {
    volumeOn = !volumeOn;
  }

  if (overButton(width / 2, 250)) {
    autoStart = !autoStart;
  }

  if (overButton(width / 2, 350)) {
    gameState = 'titleScreen'
  }
}

function overButton(x, y) {
  return (
    mouseX > x - 150 &&
    mouseX < x + 150 &&
    mouseY > y - 25 &&
    mouseY < y + 25
  );
}