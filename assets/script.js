//glabla variables
var timerElement = document.querySelector("#timer");
var startButton = document.querySelector(".start-button");
var timer;
var timerCount;

// function declarations

function startQuiz(){
    questions.forEach(question => {
        return question.question;
    });
    startTimer();
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    startButton.disabled = true;
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
            startButton.disabled = false;
        }
    }, 1000);
}

// flash timer when time is running out

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

// event handlers

startButton.addEventListener("click", startQuiz);