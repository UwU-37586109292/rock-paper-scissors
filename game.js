
/*
Algorithm:
Computer randomly selects one of 3 choices: rock/paper/scissors
Ask user for input (rock/paper/scissors)
Compare results (rock>scissors>paper>rock)
Output the result
*/

let computerScore = 0;
let playerScore = 0;

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', game);
});

function stopGame() {
    appendToDom('h1', 'We have a winner!');
    appendToDom('h2', (playerScore === 3 ? 'Player' : 'Computer') + ' won!');
    buttons.forEach(button => {
        button.removeEventListener('click', game);
    })
}
function appendToDom(elementType, textToDisplay) {
    const resultDiv = document.querySelector('.result');
    const element = document.createElement(elementType);
    element.textContent = textToDisplay;
    resultDiv.appendChild(element);
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    let roundWinner = '';
    if (playerSelection === computerSelection) {
        appendToDom('div', 'Draw! Both chose: ' + computerSelection);
        roundWinner = 'none';
    } else {
        let winner = calculateWinner(playerSelection, computerSelection);
        let winningOption = (winner === 'player') ? playerSelection : computerSelection;
        let losingOption = (winner === 'player') ? computerSelection : playerSelection;
        appendToDom('div', winner + ' wins! ' + winningOption + ' beats ' + losingOption);
        roundWinner = winner;
    }
    appendToDom('br');
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
    appendToDom('div', `Computer chose ${choice}`);
    return choice;
}

function getPlayerChoice(choice) {
    appendToDom('div', `Player chose ${choice}`);
    return choice;
}

function game(playerChoice) {
    let winner = playRound(getPlayerChoice(playerChoice.path[0].className), getComputerChoice());
    if (winner.toLowerCase() === 'player') { playerScore++; }
    else if (winner.toLowerCase() === 'computer') { computerScore++; }
    appendToDom('div', `Current score:`);
    appendToDom('div', `Player: ${playerScore}, Computer: ${computerScore}`);
    appendToDom('br');
    if (playerScore === 5 || computerScore === 5) { stopGame(); }
}

