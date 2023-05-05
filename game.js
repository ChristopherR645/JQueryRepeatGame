var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;

$(document).keydown(function(){
    if(!started){
        $('h1').text("Level "+ level);
        nextSequence()
        started = true;
    }
})
function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $('h1').text("Level "+level);
}
function playSound(chosenColour){
    switch (chosenColour) {
        case "red":
            var red = new Audio('sounds/red.mp3');
            red.play();
            break;
        case "blue":
            var blue = new Audio('sounds/blue.mp3');
            blue.play();
            break;
        case "green":
            var green = new Audio('sounds/green.mp3');
            green.play();
            break;
        case "yellow":
            var yellow = new Audio('sounds/yellow.mp3');
            yellow.play();
            break;    
        default:
            break;
    }
}
$(".btn").on("click",function(event){
    var userChosenColour = $(this).attr('id');
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);


})

function animatePress(currentColour){
    $("#"+currentColour).addClass('pressed');
    setTimeout(function(){
        $("#"+currentColour).removeClass('pressed');
    },100)
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("Correct")
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(nextSequence,1000);
            userClickedPattern = [];
        }
    }
    else{
        var wrong = new Audio('sounds/wrong.mp3');
        wrong.play();
        $('body').addClass("game-over");
        setTimeout(function(){
            $('body').removeClass("game-over");
        },200)
        console.log("Wrong");
        $('h1').text("Game Over, Press Any Key to Restart");
        startOver();
    }
    
}
function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}