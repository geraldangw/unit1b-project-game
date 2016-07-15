var canvas; //INIT CANVAS AS A GLOBAL VARIABLE
var ctx; //INIT CONTEXT
var movex = 15; //MOVE DISTANCE
var movey = 15; //MOVE DISTANCE
var ppositionx = 450; //PLAYER STARTING POSITION ON X AXIS
var ppositiony = 485; //PLAYER STARTING POSITION ON Y AXIS
var startposx = 450; //RETURNS PLAYER TO ORIGINAL X POSITION UPON LOSING OR FINISHING LEVEL
var startposy = 485; //SEE ABOVE BUT FOR Y
var level = 1; //INIT LEVEL
var WIDTH = 900; //WIDTH OF CANVAS
var HEIGHT = 500; //HEIGHT OF CANVAS
var circlesize = 4; //SIZE OF PLAYER ICON
var destheight = 10; //DESTINATION BAR HEIGHT

function init() { //CANVAS INITIALIZATION AND DRAW SCENE REFRESH RATE
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  this.stageone = setInterval(drawSceneOne, 40);
  $('button').click(reLoad);
}

init();

function reLoad() {
  location.reload();
}

function circle(x, y, r) { //FUNCTION TO CREATE CIRCLE (PLAYER ICON)
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.fill();
}

function rect(x, y, w, h) { // FUNCTION TO CREATE RECTANGLES
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function doKeyDown(evt) { //KEYDOWN FOR PLAYER MOVEMENTS
  switch (evt.keyCode) {
    case 38:
      if (ppositiony - movey > 0) { // UP ARROW
        ppositiony -= movey;
      }
      break;
    case 40:
      if (ppositiony + movey < HEIGHT) { // DOWN ARROW
        ppositiony += movey;
      }
      break;
    case 37:
      if (ppositionx - movex > 0) { // LEFT ARROW
        ppositionx -= movex;
      }
      break;
    case 39:
      if (ppositionx + movex < WIDTH) { // RIGHT ARROW
        ppositionx += movex;
      }
      break;
  }
}

window.addEventListener('keydown', doKeyDown, true); //INITIALIZING CDIRECTIONAL KEYS ON COMMAND

function Block(x, width, height, v, interval, ytopstart, numblks, color, loopinterval) {
  this.x = x; //X ORIGINAL STARTING POSITION
  this.width = width; //WIDTH OF INDIVIDUAL BLOCKS
  this.height = height; //HEIGHT OF INDIVIDUAL BLOCKS
  this.v = v; //VELOCITY OF BLOCK MOVEMENT
  this.interval = interval; //SPACE BETWEEN BLOCKS VERTICALLY
  this.ytopstart = ytopstart; //STARTING POSITION OF TOP BLOCK ON Y AXIS
  this.numblks = numblks; //NUMBER OF BLOCKS
  this.color = color; //COLOR OF BLOCKS
  this.loopinterval = loopinterval; //LOOP INTERVAL(IF LOOP INTERVAL > 1, NUMBLKS DIVIDED BY LOOP INTERVAL IS THE NUM OF BLOCKS. IT IS USED TO ADJUST YTOPSTART WHEN NECESSARY)
}

Block.prototype.createBlk = function() {
  ctx.fillStyle = this.color; //ASSIGNS COLOR
  for (var i = this.ytopstart; i <= this.numblks; i += this.loopinterval) { //LOOPS TO CREATE INDIVIDUAL BLOCKS WITH DIFFERENT Y AXIS VALUES
    yblks = []; //CREATES THE Y AXIS VALUES IN AN ARRAY
      yblks[i] = i * this.interval; //BUILDS THE SPACE BETWEEN THE BLOCKS
    if (this.x > canvas.width) {
      this.x = -this.width; // CREATES THE LOOPING EFFECT OF THE ANIMATIONS
    } else {
      ctx.fillRect(this.x, yblks[i], this.width, this.height); //DRAWS THE RECTANGLE FROM THE rect FUNCTION
      this.x += this.v; //BUILDS THE MOVEMENT UPON SET INTERVAL REFRESH RATE BY V(VELOCITY).
    }
    if (ppositionx > this.x && ppositionx < this.x + this.width && ppositiony > yblks[i] && ppositiony < yblks[i] + this.height) { //TRACKING COLLISION COURSE
      ppositionx = startposx;
      ppositiony = startposy;
    }
  }
};

function drawBaseScene() { //FUNCTION TO DRAW BASE SCENE
  ctx.fillStyle = "white";
  rect(0, 0, WIDTH, HEIGHT); //DRAWS THE BOARD
  ctx.fillStyle = "red";
  var playerposition = circle(ppositionx, ppositiony, circlesize); //DRAWS THE PLAYER ICON
  ctx.fillStyle = "#C5D86D";
  ctx.strokeStyle = "#C5D86D";
  rect(0, 0, WIDTH, destheight); //DRAWS THE DESTINATION
}

//STAGE ONE BLOCKS
var greyblkone = new Block(0 /*x*/ , 150 /*width*/ , 20 /*height*/ , 6.5 /*v*/ , 80 /*interval*/ , 0.4 /*ytopstart*/ , 6 /*numblks*/ , "#333333" /*color*/ , 1 /*loopinterval*/ );

function drawSceneOne() { // STAGE ONE
  drawBaseScene();
  greyblkone.createBlk();
  checkWinOne();
}

function checkWinOne() { // CHECKS IF PLAYER CLEARS STAGE ONE AND INITIATES STAGE TWO AND RETURNS PLAYER TO ORIGINAL POSITION
  if (ppositiony <= 15) {
    clearInterval(stageone);
    setTimeout(stageTwoInit, 1000);
    ppositiony = startposy;
    ppositionx = startposx;
    level++;
    $('#level').html('LEVEL ' + level);
  }
}

function stageTwoInit() { //INITIATES STAGE TWO DRAW SCENE
  this.stagetwo = setInterval(drawSceneTwo, 40);
}

//STAGE TWO BLOCKS
var orangeblktwo = new Block(0 /*x*/ , 150 /*width*/ , 20 /*height*/ , 7/*v*/ , 80 /*interval*/ , 0.4 /*ytopstart*/ , 6 /*numblks*/ , "orange" /*color*/ , 1 /*loopinterval*/ );
var greyblktwo = new Block(0 /*x*/ , 150 /*width*/ , 20 /*height*/ , 5 /*v*/ , 80 /*interval*/ , 0.4 /*ytopstart*/ , 6 /*numblks*/ , "#333333" /*color*/ , 1 /*loopinterval*/ );

function drawSceneTwo() { // STAGE TWO
  drawBaseScene();
  greyblktwo.createBlk();
  orangeblktwo.createBlk();
  checkWinTwo();
}

function checkWinTwo() { // CHECKS IF PLAYER CLEARS STAGE TWO AND INITIATES STAGE THREE AND RETURNS PLAYER TO ORIGINAL POSITION
  if (ppositiony <= 15) {
    clearInterval(stagetwo);
    setTimeout(stageThreeInit, 1000);
    ppositiony = startposy;
    ppositionx = startposx;
    level++;
    $('#level').html('LEVEL ' + level);
  }
}

function stageThreeInit() { //INITIATES STAGE TWO DRAW SCENE
  this.stagethree = setInterval(drawSceneThree, 40);
}

//STAGE THREE BLOCKS
var orangeblkthree = new Block(0 /*x*/ , 150 /*width*/ , 20 /*height*/ , 7.5 /*v*/ , 80 /*interval*/ , 0.4 /*ytopstart*/ , 6 /*numblks*/ , "orange" /*color*/ , 1 /*loopinterval*/ );
var greyblkthree = new Block(0 /*x*/ , 150 /*width*/ , 20 /*height*/ , 4 /*v*/ , 80 /*interval*/ , 0.4 /*ytopstart*/ , 6 /*numblks*/ , "#333333" /*color*/ , 1 /*loopinterval*/ );
var greenblkthree = new Block(0 /*x*/ , 10 /*width*/ , 40 /*height*/ , 4.5 /*v*/ , 120 /*interval*/ , 0.4 /*ytopstart*/ , 4 /*numblks*/ , "green" /*color*/ , 1 /*loopinterval*/ );


function drawSceneThree() { // STAGE THREE
  drawBaseScene();
  greyblkthree.createBlk();
  orangeblkthree.createBlk();
  greenblkthree.createBlk();
  checkWinThree();
}

function checkWinThree() { // CHECKS IF PLAYER CLEARS STAGE THREE AND INITIATES STAGE FOUR AND RETURNS PLAYER TO ORIGINAL POSITION
  if (ppositiony <= 15) {
    clearInterval(stagethree);
    setTimeout(stageFourInit, 1000);
    ppositiony = startposy;
    ppositionx = startposx;
    level++;
    $('#level').html('LEVEL ' + level);
  }
}

function stageFourInit() { //INITIATES STAGE FOUR DRAW SCENE
  this.stagefour = setInterval(drawSceneFour, 40);
}

//STAGE FOUR BLOCKS
var orangeblkfour = new Block(0 /*x*/ , 150 /*width*/ , 20 /*height*/ , 7 /*v*/ , 80 /*interval*/ , 0.4 /*ytopstart*/ , 6 /*numblks*/ , "orange" /*color*/ , 1 /*loopinterval*/ );
var greyblkfour = new Block(0 /*x*/ , 150 /*width*/ , 20 /*height*/ , 3 /*v*/ , 80 /*interval*/ , 0.4 /*ytopstart*/ , 6 /*numblks*/ , "#333333" /*color*/ , 1 /*loopinterval*/ );
var greenblkfour = new Block(0 /*x*/ , 10 /*width*/ , 40 /*height*/ , 1.5 /*v*/ , 120 /*interval*/ , 0.4 /*ytopstart*/ , 4 /*numblks*/ , "green" /*color*/ , 1 /*loopinterval*/ );
var purpleblkfour = new Block(0 /*x*/ , 250 /*width*/ , 15 /*height*/ , 4.5 /*v*/ , 120 /*interval*/ , 0.2 /*ytopstart*/ , 3 /*numblks*/ , "purple" /*color*/ , 1 /*loopinterval*/ );

function drawSceneFour() { // STAGE FOUR
  drawBaseScene();
  greyblkfour.createBlk();
  orangeblkfour.createBlk();
  greenblkfour.createBlk();
  purpleblkfour.createBlk();
  checkWinFour();
}

function checkWinFour() { // CHECKS IF PLAYER CLEARS STAGE FOUR AND INITIATES STAGE FIVE AND RETURNS PLAYER TO ORIGINAL POSITION
  if (ppositiony <= 15) {
    clearInterval(stagefour);
    setTimeout(stageFiveInit, 1000);
    ppositiony = startposy;
    ppositionx = startposx;
    level++;
    $('#level').html('LEVEL ' + level);
  }
}

function stageFiveInit() { //INITIATES STAGE FIVE DRAW SCENE
  this.stagefive = setInterval(drawSceneFive, 40);
}

//STAGE FIVE BLOCKS
var orangeblkfive = new Block(0 /*x*/ , 150 /*width*/ , 20 /*height*/ , 6 /*v*/ , 80 /*interval*/ , 0.4 /*ytopstart*/ , 6 /*numblks*/ , "orange" /*color*/ , 1 /*loopinterval*/ );
var greyblkfive = new Block(0 /*x*/ , 150 /*width*/ , 20 /*height*/ , 5.5 /*v*/ , 80 /*interval*/ , 0.4 /*ytopstart*/ , 6 /*numblks*/ , "#333333" /*color*/ , 1 /*loopinterval*/ );
var greenblkfive = new Block(0 /*x*/ , 10 /*width*/ , 40 /*height*/ , 2.4 /*v*/ , 120 /*interval*/ , 0.4 /*ytopstart*/ , 4 /*numblks*/ , "green" /*color*/ , 1 /*loopinterval*/ );
var purpleblkfive = new Block(0 /*x*/ , 250 /*width*/ , 15 /*height*/ , 2.2 /*v*/ , 120 /*interval*/ , 0.2 /*ytopstart*/ , 3 /*numblks*/ , "purple" /*color*/ , 1 /*loopinterval*/ );
var blueblkfive = new Block(0 /*x*/ , 30 /*width*/ , 30 /*height*/ , 7 /*v*/ , 160 /*interval*/ , 0.2 /*ytopstart*/ , 2 /*numblks*/ , "blue" /*color*/ , 1 /*loopinterval*/ );

function drawSceneFive() { // STAGE FIVE
  drawBaseScene();
  greyblkfive.createBlk();
  orangeblkfive.createBlk();
  greenblkfive.createBlk();
  purpleblkfive.createBlk();
  blueblkfive.createBlk();
  checkWinFive();
}

function checkWinFive() { // CHECKS IF PLAYER CLEARS STAGE FIVE AND INITIATES STAGE SIX AND RETURNS PLAYER TO ORIGINAL POSITION
  if (ppositiony <= 15) {
    clearInterval(stagefive);
    setTimeout(stageSixInit, 1000);
    ppositiony = startposy;
    ppositionx = startposx;
    level++;
    $('#level').html('LEVEL ' + level);
  }
}

function stageSixInit() { //INITIATES STAGE SIX DRAW SCENE
  this.stagesix = setInterval(drawSceneSix, 40);
}

//STAGE SIX BLOCKS
var orangeblksix = new Block(0 /*x*/ , 150 /*width*/ , 20 /*height*/ , 6 /*v*/ , 80 /*interval*/ , 0.4 /*ytopstart*/ , 6 /*numblks*/ , "orange" /*color*/ , 1 /*loopinterval*/ );
var indigoblksix = new Block(0 /*x*/ , 120 /*width*/ , 15 /*height*/ , 5 /*v*/ , 50 /*interval*/ , 0.4 /*ytopstart*/ , 4 /*numblks*/ , "indigo" /*color*/ , 1 /*loopinterval*/ );
var greenblksix = new Block(0 /*x*/ , 10 /*width*/ , 40 /*height*/ , 2.2 /*v*/ , 120 /*interval*/ , 0.4 /*ytopstart*/ , 4 /*numblks*/ , "green" /*color*/ , 1 /*loopinterval*/ );
var purpleblksix = new Block(0 /*x*/ , 250 /*width*/ , 15 /*height*/ , 4 /*v*/ , 120 /*interval*/ , 0.2 /*ytopstart*/ , 3 /*numblks*/ , "purple" /*color*/ , 1 /*loopinterval*/ );
var blueblksix = new Block(0 /*x*/ , 30 /*width*/ , 30 /*height*/ , 3 /*v*/ , 160 /*interval*/ , 0.2 /*ytopstart*/ , 3 /*numblks*/ , "blue" /*color*/ , 1 /*loopinterval*/ );
var greyblksix = new Block(0 /*x*/ , 150 /*width*/ , 20 /*height*/ , 2.5 /*v*/ , 80 /*interval*/ , 0.4 /*ytopstart*/ , 6 /*numblks*/ , "#333333" /*color*/ , 1 /*loopinterval*/ );

function drawSceneSix() { // STAGE SIX
  drawBaseScene();
  indigoblksix.createBlk();
  orangeblksix.createBlk();
  greenblksix.createBlk();
  purpleblksix.createBlk();
  blueblksix.createBlk();
  greyblksix.createBlk();
  checkWinSix();
}

function checkWinSix() { // CHECKS IF PLAYER CLEARS STAGE SIX AND INITIATES STAGE SEVEN AND RETURNS PLAYER TO ORIGINAL POSITION
  if (ppositiony <= 15) {
    clearInterval(stagesix);
    setTimeout(stageSevenInit, 1000);
    ppositiony = startposy;
    ppositionx = startposx;
    level++;
    $('#level').html('FINAL STAGE: LEVEL ' + level);
  }
}

function stageSevenInit() { //INITIATES STAGE SEVEN DRAW SCENE
  this.stageseven = setInterval(drawSceneSeven, 40);
}

//STAGE SEVEN BLOCKS
var cyanblkseven = new Block(0 /*x*/ , 40 /*width*/ , 60 /*height*/ , 6 /*v*/ , 100 /*interval*/ , 0.4 /*ytopstart*/ , 4 /*numblks*/ , "#208AAE" /*color*/ , 1 /*loopinterval*/ );
var indigoblkseven = new Block(0 /*x*/ , 120 /*width*/ , 15 /*height*/ , 4 /*v*/ , 50 /*interval*/ , 0.4 /*ytopstart*/ , 4 /*numblks*/ , "indigo" /*color*/ , 1 /*loopinterval*/ );
var magentablkseven = new Block(0 /*x*/ , 10 /*width*/ , 30 /*height*/ , 0.8 /*v*/ , 60 /*interval*/ , 0.4 /*ytopstart*/ , 8 /*numblks*/ , "#D30C7B" /*color*/ , 1 /*loopinterval*/ );
var purpleblkseven = new Block(0 /*x*/ , 50 /*width*/ , 15 /*height*/ , 1.8 /*v*/ , 120 /*interval*/ , 0.2 /*ytopstart*/ , 3 /*numblks*/ , "purple" /*color*/ , 1 /*loopinterval*/ );
var sandybrownblkseven = new Block(0 /*x*/ , 60 /*width*/ , 30 /*height*/ , 3 /*v*/ , 130 /*interval*/ , 0.2 /*ytopstart*/ , 2 /*numblks*/ , "#F09D51" /*color*/ , 1 /*loopinterval*/ );
var redblkseven = new Block(0 /*x*/ , 400 /*width*/ , 15 /*height*/ , 15 /*v*/ , 160 /*interval*/ , 0.2 /*ytopstart*/ , 1 /*numblks*/ , "red" /*color*/ , 1 /*loopinterval*/ );
var skyblueblkseven = new Block(0 /*x*/ , 15 /*width*/ , 15 /*height*/ , 7 /*v*/ , 100 /*interval*/ , 0.2 /*ytopstart*/ , 3 /*numblks*/ , "#86BBD8" /*color*/ , 1 /*loopinterval*/ );

function drawSceneSeven() { // FINAL STAGE: STAGE SEVEN
  drawBaseScene();
  cyanblkseven.createBlk();
  indigoblkseven.createBlk();
  magentablkseven.createBlk();
  purpleblkseven.createBlk();
  sandybrownblkseven.createBlk();
  redblkseven.createBlk();
  skyblueblkseven.createBlk();
  checkWinSeven();
}

function checkWinSeven() { // CHECKS IF PLAYER CLEARS STAGE SEVEN AND INITIATES STAGE EIGHT AND RETURNS PLAYER TO ORIGINAL POSITION
  if (ppositiony <= 15) {
    clearInterval(stageseven);
    ppositiony = startposy;
    ppositionx = startposx;
    level++;
    $('#level').html("YOU HAVE CROSSED THE DMZ.");
  }
}
