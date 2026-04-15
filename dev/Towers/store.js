
let towers = []; //this will have all prices and damage

function setupStore() {
  createCanvas(300, 400);
}

function drawStore() {
  background('black');
  textFont('Courier New');
  fill('white');
  
  // Tower set 1
  image(tower1, 0, 5, 85, 85);
  image(tower2, 105, 5, 85, 85);
  image(tower3, 210, 5, 85, 85);
  
  fill('white');               
  textSize(20);      
  text("$100", 10, 110);
  text("$150", 115, 110);
  text("$200", 220, 110);
  
  // Tower set 2
  image(tower4, 0, 125, 85, 85);
  image(tower6, 105, 125, 85, 85);
  image(tower5, 210, 125, 85, 85);
  
  fill('white');           
  textSize(20);     
  text("$100", 10, 235);
  text("$150", 115, 235);
  text("$200", 220, 235);
  
  // Tower set 3
  image(tower7, 0, 245, 85, 85);
  image(tower8, 105, 245, 85, 85);
  image(tower9, 210, 245, 85, 85);
  
  text("$100", 10, 355);
  text("$150", 115, 355);
  text("$200", 220, 355);
  
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
