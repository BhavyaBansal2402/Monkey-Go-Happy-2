var monkey, monkey_running;
var ground, invisibleGround, ground_img;

var bananaGroup, banana_img;
var obstacleGroup, obstacle_img;

var score;

var gameOver, gameOver_img;
var restart, restart_img;


function preload()
{
  ground_img = loadImage("jungle.jpg");
  
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  
  banana_img = loadImage("banana.png");
  
  obstacle_img = loadImage("stone.png");
  
  gameOver_img = loadImage("Game_Over.png");
  
  restart_img = loadImage("Restart.png");
  
}


function setup() 
{
  createCanvas(600, 200);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground", ground_img);
  ground.x = ground.width/2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.10;
   
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  
  gameOver = createSprite(200, 100);
  restart = createSprite(200, 175);
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  gameOver.addImage("Icon1", gameOver_img);
  restart.addImage("Icon2", restart_img);
  
}

function draw()
{
  background(220);
  
  //jumping system
  if(keyDown("space") && monkey.y>=159) 
  {
    monkey.velocityY = -10;
  }
  
  //adding gravity
  monkey.velocityY = monkey.velocityY + 0.8
  
  //never ending background
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //Increament of Score
  if(bananaGroup.isTouching(monkey))
  {
    score = score + 2;
    bananaGroup.destroyEach();
  }
  
  //Switch case
  switch(score)
  {
    case 10: monkey.scale = 0.12;
             break;
    case 20: monkey.scale = 0.14;
             break;
    case 30: monkey.scale = 0.16;
             break;
    case 40: monkey.scale = 0.18;
             break;
    default: break;
  }
  
  //Decreament of Score
  if(obstacleGroup.isTouching(monkey))
  {
    player.scale = 0.10;
  }
  
  //colliding the monkey with a new ground
  monkey.collide(invisibleGround);
  
  //Spawning the bananas and the obstacles
  spawnObstacles();
  spawnBananas();
  
  //ending the game
  if(score === 50)
  {
    EndGame();  
  }
  
  //reseting the game
  if(mousePressedOver(restart)) 
  {
    reset();
  }
  
  //displaying everything
  drawSprites();
  
  //scoring
  stroke("white");
  textSize(20);
  fill("white");  
  text("Score: "+ score, 500, 50);
  
}


function EndGame()
{
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
}


function reset()
{
  //jumping system
  if(keyDown("space") && monkey.y>=159) 
  {
    monkey.velocityY = -10;
  }
  
  //adding gravity
  monkey.velocityY = monkey.velocityY + 0.8
  
  //never ending background
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //Increament of Score
  if(bananaGroup.isTouching(monkey))
  {
    score = score + 2;
    bananaGroup.destroyEach();
  }
  
  //Switch case
  switch(score)
  {
    case 10: monkey.scale = 0.12;
             break;
    case 20: monkey.scale = 0.14;
             break;
    case 30: monkey.scale = 0.16;
             break;
    case 40: monkey.scale = 0.18;
             break;
    default: break;
  }
  
  //Decreament of Score
  if(obstacleGroup.isTouching(monkey))
  {
    player.scale = 0.10;
  }
  
  //colliding the monkey with a new ground
  monkey.collide(invisibleGround);
  
  //Spawning the bananas and the obstacles
  spawnObstacles();
  spawnBananas();
  
  //ending the game
  if(score === 50)
  {
    EndGame();  
  }
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  
  score = 0;
}


function spawnBananas()
{
  //write code here to spawn the banana
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(banana_img);
    banana.scale = 0.5;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
}


function spawnObstacles()
{
  if(frameCount % 60 === 0) {
    obstacle.velocityX = -4;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}
