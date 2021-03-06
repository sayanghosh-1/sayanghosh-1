var buttonColors=["green","red","yellow","blue"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

/**********************Key Press*****************************/
$(".startButton").click(function(){
  if(!started)
    {
      $("#level-title").text("Level "+level);
      nextSequence();
      started=true;
    }
});
/************************Generating Pattern****************/
$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

/**********************Check Answer**************************/
function checkAnswer(currentLevel)
{
if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
{
  console.log("success");
  if(userClickedPattern.length===gamePattern.length)
  {
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}
else{
  $("#level-title").text("Game over, Press A key to restart")
  var audio=new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  startOver();
}
}

/*************************Restart Game***************/
function startOver(){
  level=0;
  gamePattern=[];
  started=false;

}


/****************Random Number Generation***************/
function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

/***********************Sound Function*********************/
function playSound(name)
{
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
/***********************Animation*****************************/
function animatePress(currentcolor)
{
  $("#"+currentcolor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentcolor).removeClass("pressed");
  }, 100);
}
