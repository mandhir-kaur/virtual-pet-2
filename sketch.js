var dog,doglmg,doglmg1;
var database;
var foodS,foodStock, fedTime,lastFed, foodObj;

function preload()
{
   doglmg=loadImage("dogImg.png");
   doglmg1=loadImage("dogImg1.png");
}


function setup() 
{
  database=firebase.database();
  createCanvas(1000,400);

  foodObj=new Food();

  dog=createSprite(800,200,150,150);
  dog.addImage(doglmg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);


  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feeddog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addfood);

  
}

function draw() 
{
  background("green");
 
 

  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data)
  {
    lastFed=data.val();
  });

  drawSprites();
  fill("black");
  textSize(15);
  if(lastFed>=12)
  {
    text("Last Feed : " +lastFed%12+"PM",350,30);
  }
  else if(lastFed==0)
  {
    text("Last Feed : 12 AM",350,30);
  }
  else
  {
    text("Last Feed : " +lastFed +"AM",350,30);
  }
}

function addfood()
{
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feeddog()
{
  dog.addImage(doglmg1);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update(
    {
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    }
  )
}

function readStock(data)
{
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

