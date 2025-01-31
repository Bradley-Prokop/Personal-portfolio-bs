var livesLeft;
var guessesMade; 
var phrase = "";
var guess="";
var hintPattern=[];
var changed = false;
var correctMessage = false;
var pastPhrase;

//Sets the initial phrase and hint
selectNewPhrase();
createPattern();

//Game logic for 'Enter'
$(document).keydown(function(event){

    $("#reset-label").text("");

    if(event.key==="Enter"){

        guessesMade++;
        guess = $("#letter-input").val();
        $("#letter-input").val("");

        if(guess.length===1){
            updateClue();
            if(!changed){//If the guess was incorrect
                $("#let-used").append(" "+guess);
                livesLeft--;
                $("#winOrLose").text("Incorrect!");

            }else{
                $("#winOrLose").text("Correct!");
                checkForWin();
            }
        }else{
            checkForWinningPhrase();
        }
        if(livesLeft==0){
            $("#winOrLose").text("Sorry, you lost!");
        }
    }
    updateData();
    changed = false;
});

//Game logic for button
$("#submit").click(function(){

    $("#reset-label").text("");

    guessesMade++;
    guess = $("#letter-input").val();
    $("#letter-input").val("");

    if(guess.length===1){
        updateClue();
        if(!changed){//If the guess was incorrect
            $("#let-used").append(" "+guess);
            livesLeft--;
            $("#winOrLose").text("Incorrect!");

        }else{
            $("#winOrLose").text("Correct!");
            checkForWin();
        }
    }else{
        checkForWinningPhrase();
    }
    if(livesLeft==0){
        $("#winOrLose").text("Sorry, you lost!");
    }
    updateData();
    changed = false;
});

//Restart button functionality
$("#restart").click(function(){
    guess="";
    pastPhrase=phrase;
    selectNewPhrase();
    createPattern();
    $("#let-used").text("Letters used: ");
    $("#winOrLose").text("");
    $("#reset-label").text("");
});

//Reset button functionality
$("#resetBS").click(function(){
    localStorage.setItem(phrase, "None");
    $("#best-score").text("Best Score: "+localStorage.getItem(phrase));
    $("#reset-label").text("High score reset").css({"color": "yellow"});
    $("#winOrLose").text("");
});

//Checks for win for a single letter is entry
function checkForWin(){

    let correct = true;
    
    for(let i=0;i<phrase.length;i++){
        if(hintPattern[i]===" _ "){
            correct=false;
        }
    }

    if(correct){
        $("#winOrLose").text("Congrats, you won!");
        $("#puzzle").text(phrase);
        updateBestScore();
    }
}

//Should only be used to check if entire phrase is guessed correctly
function checkForWinningPhrase(){
    if(phrase===guess){
        $("#winOrLose").text("Congrats, you won!");
        $("#puzzle").text(phrase);
        updateBestScore();
    }else{
        $("#winOrLose").text("incorrect!");
        livesLeft--;
    }
}

//Should only be used if a single letter is entered
function updateClue(){

    for(let i=0;i<phrase.length;i++){
        if(guess==phrase.charAt(i)){
            hintPattern[i]=guess;
            changed = true;
        }
    }
    $("#puzzle").text(hintPattern.join(""));
}

//Updates guesses made and lives left
function updateData(){
    $("#attempts-made").text("Guesses made: " + guessesMade);
    $("#attempts-left").text("lives left: " + livesLeft);
}

//Creates the hint pattern for the selected phrase
function createPattern(){

    livesLeft=7;
    guessesMade=0;
    hintPattern=[];

    for(let i=0;i<phrase.length;i++){
        if(phrase.charAt(i)!=" "){
            hintPattern[i]=" _ ";
        }else{
            hintPattern[i]=" - ";
        }
    }

    $("#puzzle").text(hintPattern.join("")).css({
        "font-size": "90px",
        "color": "yellow",
        "text-align": "center",
        "padding-top": "50px"
    });
    updateData();
}

//Selects a random phrase from the array
function selectNewPhrase(){

    const phrases = ["apple pie","sunny day", "blue sky", "big cat", "green tree", 
        "jump rope", "happy face", "cold drink", "fast car", "red ball"];
    
    phrase = phrases[Math.floor(Math.random()*phrases.length)]; 

    //While keep trying to pick a new phrase if the last phrase is the same as the new phrase
    while(pastPhrase==phrase){
        phrase = phrases[Math.floor(Math.random()*phrases.length)]; 
    }
    
    //Sets the starting value to None if there is no best score set
    if(localStorage.getItem(phrase)==null){
        localStorage.setItem(phrase, "None")
    }
    $("#best-score").text("Best Score: "+localStorage.getItem(phrase));
}

//Updates the best score
function updateBestScore(){
   
    //Checks to see if there was a best score
    if(localStorage.getItem(phrase)=="None"){
        localStorage.setItem(phrase, guessesMade);
        $("#reset-label").text("New High Score set!").css({"color": "lime"});
    }else{
        let storedScore = parseInt(localStorage.getItem(phrase));
        
        if(guessesMade<storedScore){
            localStorage.setItem(phrase, guessesMade.toString());
            $("#reset-label").text("New High Score set!").css({"color": "lime"});
        }
    }

    $("#best-score").text("Best Score: "+localStorage.getItem(phrase));
}