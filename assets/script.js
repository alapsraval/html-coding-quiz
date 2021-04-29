//glabla variables
let timerElement = document.querySelector("#timer");
let startButton = document.querySelector(".start-button");
let submitBtn = document.querySelector("#submit-btn");
let saveScoreBtn = document.querySelector("#save-score");
let timer;
let timerCount = 50;
let score = 0;
// let scoreElement = document.querySelector("#score");
let resultElement = document.querySelector("#result");
let questionForm = document.querySelector("#question-form");
let questionEl = document.querySelector("#question");
let optionsEl = document.querySelector("#options");
let questionID = 0;
let highScores = [];
let initials = document.querySelector("#initials");
let scoreForm = document.querySelector("#score-form");
let highScoresEl = document.querySelector("#high-scores");
let highScoreTable = document.getElementById('high-score-table');


// function declarations

function startQuiz() {
    init();
    showQuestion();
    startTimer();
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    startButton.disabled = true;
    //timerCount = 10;
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
            //clearInterval(timer);
            //alert("Time has run out!!");
            showResult();
            startButton.disabled = false;
        }
    }, 1000);
}

// flash timer when time is running out

function flashTimer() {
    for (var i = 0; i < 5000; i = i + 1000) {
        setTimeout("hideTimer()", i);
        setTimeout("showTimer()", i + 500);
    }
}

function showTimer() {
    if (document.getElementById) {
        timerElement.style.visibility = "visible";
    }
}

function hideTimer() {
    if (document.getElementById) {
        timerElement.style.visibility = "hidden";
    }
}

function showQuestion() {
    if (questions.length > questionID) {
        let question = questions[questionID];
        //return question.question;
        questionEl.textContent = question.question;
        showOptions(question);
    } else {
        showResult();
    }
}

function showOptions(question) {
    optionsEl.textContent = '';
    let optionID = 0;
    for (let opt of question.options) {
        opt = encodeURI(opt);
        let option = document.createElement("div");
        option.className = 'form-check';
        option.innerHTML = `<input class="form-check-input" type="radio" name="answerOptions" id="option-${optionID + 1}" value=${optionID}>
                            <label class="form-check-label" for="option-${optionID + 1}">${decodeURI(opt)}</label>`;
        optionsEl.appendChild(option);
        optionID++;
    }
    submitBtn.classList.toggle("d-none");

    // let button = document.createElement("button");
    // button.type = "submit";
    // button.id = "submit-btn";
    // button.classList = "mt-3 btn btn-primary";
    // button.innerText = "Submit";
    // optionsEl.append(button);
}


function checkAnswer(e) {
    e.preventDefault();
    let options = document.querySelectorAll('input[name="answerOptions"]');
    let selectedAnswer = Array.from(options).find(radio => radio.checked).value;
    if (selectedAnswer == questions[questionID].answer) {
        score += 10;
        questionID++;
        showQuestion();
        submitBtn.classList.toggle("d-none");

    } else {
        //alert('Incorrect');
        score -= 10;
        timerCount -= 5;
    }
    // scoreElement.textContent = score;
}

function showResult() {
    score = score + timerCount;
    questionForm.classList.toggle("d-none");
    scoreForm.classList.remove("d-none");
    resultElement.innerHTML = `<p class="text-success">Your final score is ${score}.</p>`
    resultElement.classList.remove("d-none");
    clearInterval(timer);
}

function saveResults(e) {
    e.preventDefault();
    let highScore = {
        initials: initials.value,
        score: score
    }

    setHighScores(highScore);
    scoreForm.reset();
    scoreForm.classList.add("d-none");
    showHighScores();
}

function getHighScores() {
    highScores = JSON.parse(localStorage.getItem('highScores')) || [];
}

function setHighScores(score) {
    highScores.push(score);
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function showHighScores() {
    getHighScores();
    while(highScoreTable.tBodies[0].rows.length > 0){
        highScoreTable.tBodies[0].rows[0].remove()
    }

    //highScoreTable.tBodies[0].innerHTML = '';
    //table.remove();
    for (let score of highScores) {
        let tableRow = highScoreTable.insertRow();
        for (let columnName in score) {
            let tableCell = tableRow.insertCell();
            let tableCellValue = document.createTextNode(score[columnName]);
            tableCell.appendChild(tableCellValue);
        }
    }
    resultElement.classList.add("d-none");
    highScoresEl.classList.remove("d-none");
    startButton.disabled = false;
}

function init() {
    timerCount = 50;
    questionID = 0;
    score = 0;
    timerElement.textContent = timerCount;
    highScoresEl.classList.add("d-none");
    scoreForm.classList.add("d-none");
    resultElement.classList.add("d-none");
    questionForm.classList.remove("d-none");
    getHighScores();
}

// event handlers

startButton.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", checkAnswer);
saveScoreBtn.addEventListener("click", saveResults);

init();