var trex,trex_running,trex_collided;
var ground, groundimage;
var invisibleground;
var Cloudimage;
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;
var gamestate = "play";
var Cloudsgrp;
var Obsgrp;
var score = 0;
var gameover,overimage; 
var reset,restartimage;
var a,b,c
function preload() {
  trex_running = loadAnimation ("trex1.png","trex3.png","trex4.png");
  trex_collided =loadAnimation("trex_collided.png")
  groundimage = loadImage("ground2.png");
  Cloudimage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  overimage = loadImage("gameOver.png")
  restartimage = loadImage("restart.png")
  a = loadSound ("die.mp3")
 b = loadSound ("jump.mp3")

}
  
function setup() {
  createCanvas(600,200); 
  trex = createSprite (100,180,5,5);
  trex.addAnimation ("running", trex_running)
  trex.addAnimation ("collided",trex_collided);
  trex.scale = 0.5
  ground = createSprite (200,180,900,5);
  ground.addImage(groundimage)
  invisibleground = createSprite(200,185,900,5);
  invisibleground.visible = false; 
  Cloudsgrp = new Group();
  Obsgrp = new Group();
  gameover = createSprite(200,150,10,10)
  reset = createSprite(200,100,10,10)
  gameover.addImage(overimage)
  reset.addImage(restartimage)
  
}

function draw() {
  background(180);
  
  if (gamestate === "play") {
    
    if (keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12
      score = score +1
      b.play()
      }
    ground.velocityX = -8;
    
    if (ground.x < 0) {  
    ground.x = 600 };
    
    trex.velocityY = trex.velocityY + 0.8
    
    SpawnClouds();
    obstacles(); 
    
    if(Obsgrp.isTouching(trex)) {
      gamestate = "end";
      a.play()
    }
    reset.visible = false 
    gameover.visible = false 
    
  
  }
  
  
  else if (gamestate === "end") {
    Cloudsgrp.setVelocityXEach(0);
    Obsgrp.setVelocityXEach(0);
    ground.velocityX = 0 ;
    trex.changeAnimation("collided",trex_collided);
    trex.velocityY = 0
    Obsgrp.setLifetimeEach(-1);
    Cloudsgrp.setLifetimeEach(-1)
    reset.visible = true 
    gameover.visible = true 
    
    if (mousePressedOver(reset)) {
      gamestate = "play"
      Obsgrp.destroyEach();
      Cloudsgrp.destroyEach();
      trex.changeAnimation ("running",trex_running)
    
    }
  }
    

  trex.collide (invisibleground)
    
  text(score,10,15)
  
  
  

  drawSprites();
}

function SpawnClouds() {
  if (frameCount % 70 === 0) {
   var cloud = createSprite (600,Math.round (random(10,100)),10,10);
   cloud.addImage(Cloudimage);
    cloud.velocityX = -4;
    cloud.depth = trex.depth
    trex.depth = trex.depth+1 
    cloud.lifetime = 145
    Cloudsgrp.add(cloud);
  }}

function obstacles() {
  if (frameCount % 70 === 0) {
  var obstacle = createSprite(600,175,10,10)
  var r= Math.round(random(1,6));
   
    switch(r)
      {
        case 1: obstacle.addImage(obstacle1);
          break;
          
          case 2: obstacle.addImage(obstacle2);
          break; 
          
          case 3: obstacle.addImage(obstacle3);
          break;
          
          case 4: obstacle.addImage(obstacle4)
          break;
          
          case 5: obstacle.addImage(obstacle5)
          break;
          
          case 6: obstacle.addImage(obstacle6)
          break; 
          
          default: break;
      }
  obstacle.velocityX = -8   
    
    obstacle.y = 155 
    obstacle.scale =0.8  
    obstacle.lifetime = 145
    Obsgrp.add(obstacle);
    
    
  
  }
  }

