var buttonID;
var healthLevel;
var height;
var weight;
var bmi;

$(".btn").on("click", function(){
    
    buttonID = $(this).attr('id');
    animatePress();
    playSound();

    pullData();

    switch(buttonID){

        case "calc-bmi-imperial":
            bmi = 703 * (weight/(height**2));
            determineHealthLevel();
            $("#imp").html("BMI: "+bmi.toFixed(1)+" "+healthLevel);
            break;
        default:
            bmi = (weight/(height**2));
            determineHealthLevel();
            $("#met").html("BMI: "+bmi.toFixed(1)+" "+healthLevel);
            break;
    }
});

function pullData(){

    switch(buttonID){

        case "calc-bmi-imperial":
            let feet = Number($("#feet").val());
            let inches = Number($("#inches").val());
            weight = $("#weight").val();
            height = (feet*12+inches);
            break;
        default:
            height = $("#centimeters").val()/100;
            weight = $("#kilograms").val();            
            break;
    }
}

function determineHealthLevel(){
    
    if(bmi<18.5)
        healthLevel="You're underweight!";
    else if(bmi<24.9)
        healthLevel="You're normal weight!";
    else if(bmi<29.9)
        healthLevel="You're overweight!";
    else
        healthLevel="You're obese!";
}

function playSound(){
    var sound = new Audio("click.wav");
    sound.play();
}

function animatePress(){

    $("#"+buttonID).addClass("pressed");

    setTimeout(function(){
        $("#" + buttonID).removeClass("pressed");
    }, 100);
}