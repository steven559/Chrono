var seconds = document.getElementById("seconds");
var heure = document.getElementById("heur");
var reste = reste % 3600;
var time = reste % 60;
var minutes = Math.floor(reste / 60);
var stop;
var heur = Math.floor(time / 3600);
var enminute = document.getElementById("minute");


var stopCountUp = function () {
    document.getElementById("button").style.visibility = "visible";
    clearTimeout(stop);

};
var stopButton = document.getElementById("stop-button");
stopButton.addEventListener("click", stopCountUp);


var but = document.getElementById("but");
var inp = document.getElementById("tim");

var input = document.getElementById("minut");
but.addEventListener("click", function () {
    if (inp.value >= 60) {
        inp.value = "";
        document.getElementById("ereur").innerHTML = "veuillez entrer un nombre inferieur a 59";
    }
    else {
        document.getElementById("ereur").style.visibility = "hidden";
    }

    minutes = Math.floor(reste / 60);
    time = inp.value;
    minutes = input.value;
    heur = Math.floor(time / 3600);
    heur = Math.floor(minutes / 60);
    heure.innerHTML = heur;
    reste = time % 3600;
    minutes = minutes % 60;


    enminute.innerHTML = minutes;
    reste = reste % 60;

    clearTimeout(stop);
    stop = setTimeout(countUp, 1000);
    time = reste;
    //  seconds.innerHTML=reste--;

    console.log(time);


});

var countUp = function () {
    stop = setTimeout(countUp, 1000);
    stop;

    enminute.innerHTML = minutes;

    seconds.innerHTML = reste--;


    console.log(minutes);
    if (reste <= 0 && minutes > 0) {
        reste = 59;
        minutes--;
        enminute.innerHTML = minutes;
        seconds.innerHTML = reste;


        console.log();
    }
    if (minutes <= 0 && heur > 0) {
        minutes = 60;
        heur--;
        heure.innerHTML = heur;
        enminute.innerHTML = minutes;
    }
    if (reste <= -1 && minutes <= 0) {
        clearTimeout(stop);
    }


    document.getElementById("button").style.visibility = "hidden";

};


var bout = document.getElementById("bout");
bout.addEventListener("click", function () {


    clearTimeout(stop);
    console.log(stop);
    time = 0;
    minutes = 0;
    heur = 0;
    enminute.innerHTML = minutes;
    seconds.innerHTML = time;
    heure.innerHTML = heur;

});
var button = document.getElementById("button");
button.addEventListener("click", countUp);


