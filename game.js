let gameStart = false;
let level = 0;
let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];

$(document).keypress(() => {
    if (!gameStart) {
        nextSequence();
        gameStart = true;
    }
});

let nextSequence = () => {
    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];  
    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColour);

}

let playSound = name => {
    if (name === "red") {
        let pathRed = "sounds/red.mp3"
        let audio = new Audio(pathRed);
        audio.play();
    } else if (name === "blue") {
        let pathBlue = "sounds/blue.mp3"
        let audio = new Audio(pathBlue);
        audio.play();
    } else if (name === "green") {
        let pathGreen = "sounds/green.mp3"
        let audio = new Audio(pathGreen);
        audio.play();
    } else if (name === "yellow"){
        let pathYellow = "sounds/yellow.mp3"
        let audio = new Audio(pathYellow);
        audio.play();
    }
}

let animatePress = currentColour => {
    $("."+ currentColour).addClass("pressed");
    setTimeout(() => {
        $("."+ currentColour).removeClass('pressed');
    }, 100);
}

$(".btn").click(e => {
    let userChosenColour = e.target.id;
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


let checkAnswer = currentLevel => {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(() => nextSequence(), 1000);
        }
    } else {
        console.log("Wrong")
        let audioWrong = new Audio("sounds/wrong.mp3");
        audioWrong.play();
        $("body").addClass("game-over");
        setTimeout(() => $("body").removeClass("game-over"), 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(() => startOver(), 200);
    }   
}

let startOver = () => {
    level = 0;
    gamePattern = [];
    gameStart = false;
}