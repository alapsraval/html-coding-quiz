var timerElement = document.querySelector("#timer");
var startButton = document.querySelector(".start-button");
var timer;
var timerCount;

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    timerCount = 10;
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount < 5 && timerCount > 0) {
            // start flashing timer
            flashTimer();
        }

        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            alert("Time has run out!!");
        }
    }, 1000);
}

function flashTimer() {
    for (var i = 0; i < 5000; i = i + 1000) {
        setTimeout("hide()", i);
        setTimeout("show()", i + 500);
    }
}

function show() {
    if (document.getElementById) {
        timerElement.style.visibility = "visible";
    }
}

function hide() {
    if (document.getElementById) {
        timerElement.style.visibility = "hidden";
    }
}

startButton.addEventListener("click", startTimer);