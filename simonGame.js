var colours = ["green","red","yellow","blue"];

var gamePattern = [];
var userPattern = [];

var hasStarted = false;
var level = 0;
var bestLevel = 0;

$('#start').click(function(){
    $('.on').css("backgroundColor","green");    
    $('#game-over').css('display','none');
    if(!hasStarted){
        nextSequence();
        hasStarted = true;
    } 
})

$('.btn').click(function(){
    var chosenColour = $(this).attr("id");
    userPattern.push(chosenColour);
    playAudio(chosenColour);
    flashButton(chosenColour);
    checkAnswer(userPattern.length - 1);
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userPattern[currentLevel]){
        if(gamePattern.length === userPattern.length){
            setTimeout(nextSequence,1000);
        }
    }
    else{        
        var fail = new Audio('./sounds/fail.mp3');
        fail.play();

        setTimeout(function(){
            $('.on').css("backgroundColor","red");
        },3000);

        if(level > bestLevel){
            bestLevel = level;
            $('#turn-counter2').text(bestLevel);
        }

        $('#game-over').css('display','contents');

        gameOverFlash();

        startOver();
    }
}

function startOver(){
    gamePattern = [];
    userPattern = [];
    hasStarted = false;
    level = 0;
}

function nextSequence(){

    level++;
    $('#turn-counter').text(level);

    userPattern = [];

    var randomNumbers = Math.floor(Math.random()*4); //random num from 0 to 3
    var randomColours = colours[randomNumbers];

    gamePattern.push(randomColours); //pushing random colours inside the gamePattern array

    for(let i = 0; i < gamePattern.length; i++){
        
        setTimeout(function(){
            $('#'+gamePattern[i]).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
            playAudio(gamePattern[i]);
        }, i*500)
    }
}

function playAudio(colour){

    var songNumber = 0;
    switch(colour){
        case "green": songNumber = 1; break;
        case "red": songNumber = 2; break;
        case "yellow": songNumber = 3; break;
        case "blue": songNumber = 4; break;
    }

    var sound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound'+songNumber+'.mp3');
    sound.play();
}

function flashButton(colour){

    $("#"+colour).addClass("pressed");
    setTimeout(function(){
        $("#"+colour).removeClass("pressed");
    }, 200);
}

function gameOverFlash(){
    for(let i = 0; i < 5; i++){
        setTimeout(() => {
            $(".btn").addClass('pressed');
            setTimeout(() => {
                $('.btn').removeClass('pressed');
            },200);
        }, i * 500);
    }
}