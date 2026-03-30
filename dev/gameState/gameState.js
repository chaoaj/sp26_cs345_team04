function draw() {
  if (gameState === 'titleScreen'){
    drawTitleScreen();
  } else if (gameState === 'settings'){
    drawSettings();
  }else if (gameState === 'levelSelect') {
    drawLevelSelect();
  } else if (gameState === 'map1') {
    drawMap1();
  }
    else if (gameState === 'map2'){
      // map 2
    }
    else if (gameState === 'map3'){
      // map 3
    }
}