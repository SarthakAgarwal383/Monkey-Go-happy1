var Monkey,MonkeyImg,banana,banana_img,obstacle;
var obstacleImg,bananaGroup,obstaclesGroup,jungle,
    jungleImg,score,invGround,Monkey_c;
var PLAY,END,gameState,reset,reseti;
var die,jump,cp,go,goimg;

function preload(){

  jungleImg=loadImage("jungle.jpg");
  MonkeyImg=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  banana_img=loadImage("banana.png");
  obstacleImg=loadImage("stone.png");
  
  die=loadSound("die.mp3");
  jump=loadSound("jump.mp3");
  cp=loadSound("checkPoint.mp3");
  
  goimg=loadImage("game over.webp");
  
  Monkey_c=loadAnimation("Monkey_06.png");
  
  reseti=loadImage("reset.jpg");
}

function setup() {
  createCanvas(400, 400);
  
  jungle=createSprite(200,200,10,10);
  jungle.addImage(jungleImg);
  jungle.x=jungle.width/2;
  
  Monkey=createSprite(50,380,10,10);
  Monkey.addAnimation("running",MonkeyImg);
  Monkey.scale=0.1;
  
  invGround=createSprite(200,385,400,5);
  invGround.visible=false;
  
  bananaGroup=createGroup();
  obstaclesGroup=createGroup();
  
  score=0;
  PLAY=1;
  END=0;
  gameState=PLAY;
  
  go=createSprite(200,200,10,10);
  go.addImage(goimg);
  go.visible=false;
  go.scale=0.8;
  
  Monkey.addAnimation("collided",Monkey_c);
  
  reset=createSprite(200,320,10,10);
  reset.addImage(reseti);
  reset.visible=false;
}

function draw() {
  background(220);
  
  Monkey.collide(invGround);
  if(gameState===PLAY){
    jungle.velocityX=-6;
  
  if(jungle.x<0){
    jungle.x=jungle.width/2;
  }
  if(keyDown("space") && Monkey.y>300){
    Monkey.velocityY=-15;
    jump.play();
    
    
  }
  Monkey.velocityY=Monkey.velocityY+0.8;
  
  if(bananaGroup.isTouching(Monkey)){
    score=score+2;
    bananaGroup.destroyEach();
    cp.play();
  }
  switch (score) {
    case 10:
      Monkey.scale = 0.12;
      break;
    case 20:
      Monkey.scale = 0.14;
      break;
    case 30:
      Monkey.scale = 0.16;
      break;
    case 40:
      Monkey.scale = 0.18;
      break;
    case 50:
      Monkey.scale = 0.20;
      break;
    default: break;
  }
  
  bananas();
  stones();
    
  
  
   if(obstaclesGroup.isTouching(Monkey)){
      gameState=END;
      die.play();
    }
  
  }
  if(gameState==END){
    jungle.velocityX=0;
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    go.visible=true;
    Monkey.changeAnimation("collided",Monkey_c);
    reset.visible=true;
   
    
    
  }
  if(mousePressedOver(reset) && gameState==END){
      gameState=PLAY;
      score=0;
      go.visible=false;
      reset.visible=false;
      bananaGroup.destroyEach();
      obstaclesGroup.destroyEach();
      jungle.velocityX=-6;
    Monkey.changeAnimation("running",MonkeyImg);
    Monkey.y=350;
    Monkey.scale=0.1;
    }
 
  
 
  
  drawSprites();
  textSize(20);
  fill("white");
  
text("Score:"+score,300,50);

  
 
}
function bananas(){
  if(frameCount%80==0){
    var r=random(180,280)
    banana=createSprite(420,r,10,10);
    banana.addImage(banana_img);
    banana.velocityX=-6;
    banana.lifetime=120;
    banana.scale=0.05;
    
    bananaGroup.add(banana);
  }
}
  function stones(){
    if(frameCount%300==0){
      obstacle=createSprite(420,350,10,10);
      obstacle.addImage(obstacleImg);
      obstacle.velocityX=-6;
      obstacle.lifetime=120;
      obstacle.scale=0.20;
      obstacle.setCollider("circle",20,20,120);
      obstaclesGroup.add(obstacle);
    }
  }

 
