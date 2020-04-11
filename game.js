 var buttonColors = ["red", "blue", "green", "yellow"];
 var gamePattern = [];
 var userClickedPattern = []; 
 var level = 0;
 var gameStarted = false;

// EVENT HANDLERS

// LISTEN FOR KEYPRES
 $("#play").on("click", function(){
     if(!gameStarted){
        nextSequence();
        gameStarted = true;
     }
     
 });

 $("#reset").on("click", reset);

 // LISTEN FOR BUTTON CLICK
 $(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    console.log(userChosenColor);

    userClickedPattern.push(userChosenColor);
   
     playSound(userChosenColor);
     animationPress(userChosenColor);
     checkAnswer(userClickedPattern.length-1);

     
 });

 // CHECK ANSWER
function checkAnswer(currentLevel) {

    // CHECK IF USER PATTERN MATCHES GAME PATTERN
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        // CHECK TO SEE IF USER FINISHED CURRENT SEQUENCE
        if(userClickedPattern.length === gamePattern.length){

            // CALL NEXT SEQUENCE
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        // ADD GEME-OVER CLASS TO BODY
        $("body").addClass("game-over");

        // REMOVE GAME-OVER CLASS AFTER 200 MS
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        //PLAY GAME-OVER SOUND
       playSound("wrong");
        
        // CHANGE H1 TEXT TO GAME-OVER
        $("h1").html("GAMEOVER! level reached " + level);

        // RESET GAME VALUES RESTART GAME
        startOver();
    }
}


 // RUNS ON ANY KEY PRESS
function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);

    level++;

    $("h1").text("Level " + level);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    
    $("." + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

// RESET GAME START OVER
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted  = false;
    
}

// BUTTON RESET
function reset() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted  = false;
    nextSequence();
}

// PLAY SOUND
function playSound(color) {
    switch (color) {
        case "blue":
            var blueSound = new Audio("./sounds/blue.mp3");
            blueSound.play();
            break;
        case "green":
            var greenSound = new Audio("./sounds/green.mp3");
            greenSound.play();
            break;
        case "red":
            var redSound = new Audio("./sounds/red.mp3")
            redSound.play();
            break;
        case "yellow":
            var yellowSound = new Audio("./sounds/yellow.mp3");
            yellowSound.play();
            break;
        case "wrong":
            var wrongSound = new Audio("./sounds/wrong.mp3");
            wrongSound.play();
            break;
    
        default:
            console.log("No sound to play");
            break;
    }
}

// BUTTON CLICKED ANIMATION
function animationPress(currentColor) {
    $("." + currentColor).addClass("pressed");

    setTimeout(function(){
        $("." + currentColor).removeClass("pressed");  
    }, 100);

}



