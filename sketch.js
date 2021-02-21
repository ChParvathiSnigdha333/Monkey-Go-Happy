var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana, bananaImg;
var stone, stoneImg;
var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0, bananasCollected = 0;
var gameOver, gameOverImg, restart, restartImg;
var bgMusic;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png")
  stoneImg = loadImage("stone.png")
  gameOverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")
}

function setup() {
  createCanvas(900,550);
  
  backgr=createSprite(0,0,1200,550);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/3;
  backgr.velocityX = -(4 + score/100);;
  
  player = createSprite(100,200,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.2;
  
  ground = createSprite(400,450,1200,10);
  ground.x=ground.width/3;
  ground.visible=false;

  gameOver = createSprite(430,280,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1.5;
  gameOver.visible = false;

  restart = createSprite(420,385,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.2;
  restart.visible = false;

  FoodGroup = createGroup();
  StoneGroup = createGroup();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){

    player.visible = true;

    score = score + Math.round(getFrameRate()/60);
  
    if(backgr.x<200){
      backgr.x=backgr.width/3;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -(15 + score/100);;
    }

    player.velocityY = player.velocityY + 0.9;
    player.collide(ground);

    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      bananasCollected = bananasCollected + 1;
      //player.scale += +0.1;
    }

    spawnFood();
    spawnStones();

    if(StoneGroup.isTouching(player)){
      gameState = END;
    }

  } else if (gameState === END){

    backgr.velocityX = 0;
    player.visible = false;

    FoodGroup.destroyEach();
    StoneGroup.destroyEach();

    gameOver.visible = true;
    restart.visible = true;

    if(mousePressedOver(restart)){
      reset();
    }
  }

  drawSprites();

  stroke("black");
  strokeWeight(1);
  fill("white")
  textSize(25);
  textFont("Comic Sans MS");
  text("Score : " + score,350,30)

  stroke("black");
  strokeWeight(1);
  fill("white")
  textSize(25);
  textFont("Comic Sans MS");
  text("Bananas Collected :  " + bananasCollected,300,60)

}

function spawnFood(){
  if (frameCount % 130 === 0){
   var banana = createSprite (1000,Math.round(random (100,330)) ,0,0 );
    banana.addImage (bananaImg);
    banana.scale = 0.07;
    banana.velocityX = -(4 + score/100);;
    banana.lifetime = 250;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnStones(){
  if (frameCount % 150 === 0){
    var stone = createSprite (1000,390,10,10);
    stone.addImage(stoneImg);
    stone.scale= 0.28;
    stone.velocityX = -(4 + score/100);;
    stone.lifetime = 250;
    StoneGroup.add(stone);
    //stone.debug = true;
    stone.setCollider("circle",0,0,170)
  }
}

function reset(){
  score = 0;
  bananasCollected = 0;

  gameState = PLAY;
  player.visible = true;
  player.y = 200;

  gameOver.visible = false;
  restart.visible = false;

  backgr.velocityX = -(4 + score/100);;
}