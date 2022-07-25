let computerScore = 0;
let playerScore = 0;
const POINTS_TO_WIN = 5;
let finalWinner = '';
let roundCounter = 0;

const buttons = document.querySelectorAll('.player-choice button');
buttons.forEach(button => {
    button.addEventListener('click', playGame);
});
const buttonReset = document.querySelector('.player-panel>button');
buttonReset.addEventListener('click', resetGame);

function resetGame() {
    computerScore = 0;
    playerScore = 0;
    finalWinner = '';
    roundCounter = 0;
    document.getElementById('roundCounter').textContent = `Round number: ${roundCounter}`;
    document.getElementById('computerScore').textContent = `Computer score: ${computerScore}`;
    document.getElementById('playerScore').textContent = `Player score: ${playerScore}`;
    document.getElementById('playerChoice').textContent = '';
    document.getElementById('computerChoice').textContent = '';
    document.getElementById('roundResult').textContent = '';
    document.getElementById('winner').textContent = '';
    document.getElementById('celebrate').setAttribute("src", "");

    const buttons = document.querySelectorAll('.player-choice button');
    buttons.forEach(button => {
        button.addEventListener('click', playGame);
    });

}

function playGame(playerChoiceEvent) {
    let winner = playRound(getPlayerChoice(playerChoiceEvent), getComputerChoice());
    saveNewScore(winner);
    displayScore();
    roundCounter++;
    document.getElementById('roundCounter').textContent = `Round number: ${roundCounter}`;
    checkWinConditions();
}

function checkWinConditions() {
    if (playerScore === POINTS_TO_WIN || computerScore === POINTS_TO_WIN) {
        finalWinner = playerScore === POINTS_TO_WIN ? 'Player' : 'Computer';
        stopGame();
    }
}

function saveNewScore(winner) {
    if (winner.toLowerCase() === 'player') { playerScore++; }
    else if (winner.toLowerCase() === 'computer') { computerScore++; }
}

function displayScore() {
    document.getElementById('playerScore').textContent = `Player score: ${playerScore}`;
    document.getElementById('computerScore').textContent = `Computer score: ${computerScore}`;
}


function stopGame() {
    document.getElementById('winner').textContent = finalWinner + ' won!';
    document.getElementById('celebrate').setAttribute("src", "./images/celebrate.gif");
    buttons.forEach(button => {
        button.removeEventListener('click', playGame);
    })
}

function playRound(playerSelection, computerSelection) {
    let roundWinner = '';


    if (playerSelection === computerSelection) {
        document.getElementById('roundResult').textContent = 'Draw! Both chose: ' + computerSelection;
        roundWinner = 'none';
    } else {
        let winner = calculateWinner(playerSelection, computerSelection);
        let winningOption = (winner.toLowerCase() === 'player') ? playerSelection : computerSelection;
        let losingOption = (winner.toLowerCase() === 'player') ? computerSelection : playerSelection;
        document.getElementById('roundResult').textContent = winner + ' wins! ' + winningOption + ' beats ' + losingOption;
        roundWinner = winner;
    }
    return roundWinner;
}

function calculateWinner(playerSelection, computerSelection) {
    if ((playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper') ||
        (playerSelection === 'rock' && computerSelection === 'scissors')) {
        return 'Player';
    } else return 'Computer';
}

function getComputerChoice() {
    const randomChoice = Math.floor(Math.random() * 3);
    let choice = '';
    if (randomChoice === 0) {
        choice = 'rock';
    } else if (randomChoice === 1) {
        choice = 'paper';
    } else choice = 'scissors';
    document.getElementById('computerChoice').textContent = 'Computer chose: ' + choice;
    return choice;
}

function getPlayerChoice(choiceEvent) {
    let choice = choiceEvent.srcElement.className;
    document.getElementById('playerChoice').textContent = 'Player chose: ' + choice;
    return choice;
}

function appendToDom(elementType, textToDisplay, parentElementClass) {
    let resultDiv;
    if (typeof (parentElementClass) == "undefined") { resultDiv = document.querySelector('.result'); }
    else {
        resultDiv = document.querySelector(`.${parentElementClass}`);
    }
    const element = document.createElement(elementType);
    element.textContent = textToDisplay;
    resultDiv.appendChild(element);
}