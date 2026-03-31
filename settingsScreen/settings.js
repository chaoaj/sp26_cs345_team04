let volumeOn = true;
let autoStart = false;
let offset = 27;

function setupSettings() {
  textAlign(CENTER, CENTER);
  rectMode(CENTER);


  for (let i = 0; i < 50; i++) {
    stars.push({
      x: random(width),
      y: random(height / 2),
      size: random(1, 3)
    });
  }
}

function drawSettings() {
  push();
  drawBackground();
  drawTitle();
  drawButtons();
  textFont('Courier New');
  pop();
}

function drawBackground() {
  background(20, 15, 40);

  fill(255);
  noStroke();
  for (let s of stars) {
    circle(s.x, s.y, s.size);
  }
  drawCastle();
  drawTrees();
  drawMoon();
  drawGrass();
  

}
function drawMoon() {
  let x = 560;
  let y = 80;
  let p = 6; // pixel size

  noStroke();


  fill(200, 220, 255, 120);
  rect(x - p, y - 3*p, p, p);
  rect(x + p, y - 3*p, p, p);
  rect(x - 3*p, y - p, p, p);
  rect(x + 3*p, y - p, p, p);
  rect(x - p, y + 3*p, p, p);
  rect(x + p, y + 3*p, p, p);


fill(230, 240, 255);


rect(x - p, y - 3*p, p, p);
rect(x,     y - 3*p, p, p);


rect(x - 2*p, y - 2*p, p, p);
rect(x - p,   y - 2*p, p, p);
rect(x,       y - 2*p, p, p);
rect(x + p,   y - 2*p, p, p);

rect(x - 2*p, y - p, p, p);
rect(x - p,   y - p, p, p);
rect(x,       y - p, p, p);
rect(x + p,   y - p, p, p);


rect(x - 2*p, y, p, p);
rect(x - p,   y, p, p);
rect(x,       y, p, p);
rect(x + p,   y, p, p);
rect(x + p,   y, p, p);
rect(x + p,   y, p, p);
rect(x + p,   y, p, p);
rect(x + 2*p, y, p, p);
rect(x + p,   y, p, p);
rect(x,       y, p, p);



rect(x - 2*p, y + p, p, p);
rect(x - p,   y + p, p, p);
rect(x,       y + p, p, p);
rect(x + p,   y + p, p, p);


rect(x - p, y + 2*p, p, p);
rect(x,     y + 2*p, p, p);


  fill(255, 255, 255);
  rect(x - p, y - p, p, p);
}

function drawGrass() {

  fill(0, 50, 0);
  rect(width / 2, height - 40, width, 80);
  rect(0, 355, 2000, 80); 


}

function drawTrees() {
  let p = 6; // pixel size

  for (let i = 0; i < width; i += 80) {
    let x = i + 40;
    let baseY = height - 80;


    fill(80, 50, 20);
    rect(x, baseY, p, p + 100);


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
  let p = 6; // pixel size
  let x = 180;
  let y = 300;

  rectMode(CENTER);
  noStroke();


  fill('gray');
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
  

  x = 245;
  y = 300;

  rectMode(CENTER);
  noStroke();


  fill('gray');
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
  
  
  x = 325;
  y = 300;

  rectMode(CENTER);
  noStroke();


  fill('gray');
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
  
  x = 405;
  y = 300;

  rectMode(CENTER);
  noStroke();


  fill('gray');
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

function drawTitle() {
  fill(200, 170, 80);
  stroke(150, 120, 50);
  strokeWeight(3);

  rect(width / 2, 80, 400, 60);

  noStroke();
  fill(240, 220, 120);
  textSize(28);
  text("SCARY TOWER SETTINGS", width / 2, 80);
}

function drawButtons() {
  drawToggleButton(width / 2, 170, "VOLUME", volumeOn ? "ON" : "OFF");
  drawToggleButton(width / 2, 250, "AUTOSTART", autoStart ? "ON" : "OFF");
  
  //back button
  stroke(120, 90, 40);
  strokeWeight(3);
  fill(60, 40, 20);
  rect(width / 2, 330, 300, 50);
  noStroke();
  fill(200, 170, 80);
  rect(width / 2, 330, 280, 40);
  fill(40);
  textSize(16);
  text("BACK", width / 2, 330);
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
  text(label + ": " + state, x, y);
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