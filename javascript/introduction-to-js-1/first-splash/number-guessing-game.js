let randomNumbers = new Array();
let guesseses;
let lastResults;
let lowOrHis;
let guessFields;
const timeLimit = document.querySelector('.timeLimit');
let startButton = document.querySelector('.startButton');
let guessSubmit = document.querySelector('.guessSubmit');
let numbers = document.querySelector('.numbers');
let quantity = document.querySelector('.quantity');
let guessCount = 1;
let timer;
let totalScore = document.querySelector('.totalScore');
let score;
let pause;
const timeLimitConst = 100;


function createNewNumber(){
    let e=document.createElement("div");
    e.className="number";

    let form = document.createElement("div");
	form.className="form";
	e.appendChild(form);

    let label = document.createElement("label");
    label.setAttribute("for", "guessField");
    label.textContent = "Enter a guess: "
	form.appendChild(label);

    let input = document.createElement("input");
    input.type = "text";
    input.id = "guessField";
    input.className = "guessField";
    form.appendChild(input);

    let resultParas = document.createElement("div");
    resultParas.className = "resultParas";

    let child1 = document.createElement("p");
    child1.className = "guesses";
    let child2 = document.createElement("p");
    child2.className = "lastResult";
    let child3 = document.createElement("p");
    child3.className = "lowOrHi";
    resultParas.appendChild(child1);
    resultParas.appendChild(child2);
    resultParas.appendChild(child3);

    e.appendChild(resultParas);
    return e
}


//guessField.disabled = true;
guessSubmit.disabled = true;
startButton.addEventListener("click", startGame);
pause = true;
timer=setInterval("countDown()",1000);

function startGame() {
    let quantityValue = quantity.value;
    quantityValue = parseInt(quantityValue)
    if (!(quantityValue >= 1 && quantityValue <= 5)) {
        alert("select number between 1 and 5");
        return
    }

    score = 0;
    totalScore.textContent = '';

    for (let i = 0; i < quantityValue; i++) {
        let newNumber = createNewNumber();
        numbers.insertAdjacentElement('afterbegin', newNumber);
        randomNumbers[i] = Math.floor(Math.random() * 100) + 1;
    }
    guesseses = document.querySelectorAll('.guesses');
    lastResults = document.querySelectorAll('.lastResult');
    lowOrHis = document.querySelectorAll('.lowOrHi');
    guessFields = document.querySelectorAll('.guessField');
    for (let i = 0; i < guessFields.length; i++) {
        guessFields[i].addEventListener("input", stateHandle);
    }
    startButton.disabled = true;
    timeLimit.textContent = timeLimitConst;
    //timer=setInterval("countDown()",1000);
    pause = false;
}

function countDown() {
    if (pause){
        return
    }
    let sec=timeLimit.textContent;
    sec=parseInt(sec);
    tmWrite(sec-1);
}

function tmWrite(int) {
    timeLimit.textContent=int;
    if (int<=0) {
        for (let i = 0; i < guessFields.length; i++) {
            let lastResult = lastResults[i];
            let lowOrHi = lowOrHis[i];
            lastResult.textContent = '!!!GAME OVER!!!';
            lastResult.style.backgroundColor = 'red';
            lowOrHi.textContent = '';
        }
        score = 0;
        setGameOver();
    }
}





function stateHandle() {
    let emptyBool = false;
    for (let i = 0; i < guessFields.length; i++) {
        let guessField = guessFields[i];
        if (guessField.disabled){
            continue;
        }
        if(guessField.value === "") {
            emptyBool = true;
            continue;
        }
    }
    if (emptyBool) {
        guessSubmit.disabled = true;
    } else {
        guessSubmit.disabled = false;
    }
}

function checkGuesses() {
    let allRightFlag = true;
    for (let i = 0; i < guesseses.length; i++) {
        let guesses = guesseses[i];
        let lastResult = lastResults[i];
        let lowOrHi = lowOrHis[i];
        let guessField = guessFields[i];
        let randomNumber = randomNumbers[i];
        if (!guessField.disabled){
            let rightFlag = checkGuess(randomNumber, guesses, lastResult, lowOrHi, guessField);
            if (!rightFlag){
                allRightFlag = false;
            }
        }
    }
    guessSubmit.disabled = true;
    if (allRightFlag){
        setGameOver();
    } else if (guessCount === 10){
        score = 0;
        setGameOver();
    }
    guessCount++;
}

function checkGuess(randomNumber, guesses, lastResult, lowOrHi, guessField) {
    let rightFlag = false;
    const userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = 'Previous guesses: ';
    }

    guesses.textContent += userGuess + ' ';

    if (userGuess === randomNumber) {
        let sec=timeLimit.textContent;
        lastResult.textContent = 'Congratulations! You got it right! Score:' + sec;
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        rightFlag = true;
        guessField.disabled = true;
        sec=parseInt(sec);
        score += sec;
        //setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!GAME OVER!!!';
        lowOrHi.textContent = '';
        //setGameOver();
    } else {
        lastResult.textContent = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Last guess was too low!' ;
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Last guess was too high!';
        }
    }

    guessField.value = '';
    guessField.focus();
    return rightFlag;
}

guessSubmit.addEventListener('click', checkGuesses);

function setGameOver() {
    //clearInterval(timer);
    pause = true;
    for (let i = 0; i < guessFields.length; i++) {
        let guessField = guessFields[i];
        guessField.disabled = true;
    }
    guessSubmit.disabled = true;
    startButton.disabled = false;
    startButton.value = 'Start new game';
    startButton.addEventListener('click', resetGame);
    totalScore.textContent = String(score);
}

function resetGame() {
    let quantityValue = quantity.value;
    quantityValue = parseInt(quantityValue);
    if (!(quantityValue >= 1 && quantityValue <= 5)) {
        alert("select number between 1 and 5");
        return
    }

    guessCount = 1;
    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
        resetPara.textContent = '';
    }


    /*
    for (let i = 0; i < guessFields.length; i++) {
        let randomNumber = Math.floor(Math.random() * 100) + 1;
        randomNumbers[i] = randomNumber;
        let guessField = guessFields[i];
        guessField.disabled = false;
        guessField.value = '';
        guessField.focus();
        let lastResult = lastResults[i];
        lastResult.style.backgroundColor = 'white';
    }
    */
    let numberDivs = document.querySelectorAll('.number');
    for (let i = 0; i < numberDivs.length; i++) {
        numberDivs[i].remove();
    }
    guessSubmit.disabled = true;
    
    
    startGame();
}