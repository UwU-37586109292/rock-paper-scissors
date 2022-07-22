
/*
Algorithm:
Computer randomly selects one of 3 choices: rock/paper/scissors
Ask user for input (rock/paper/scissors)
Compare results (rock>scissors>paper>rock)
Output the result
*/

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        playRound(getPlayerChoice(event.path[0].className), getComputerChoice());
    })
});



function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    let isInputValid = validatePlayerInput(playerSelection);
    if (isInputValid) {
        if (playerSelection === computerSelection) {
            console.log('Draw! Both chose: ' + computerSelection);
        } else {
            let winner = calculateWinner(playerSelection, computerSelection);
            let winningOption = (winner === 'player') ? playerSelection : computerSelection;
            let losingOption = (winner === 'player') ? computerSelection : playerSelection;
            console.log(winner + ' wins! ' + winningOption + ' beats ' + losingOption);
        }
    } else {
        console.log('Player chose unknown option. Quitting :(');
    }
}

function validatePlayerInput(input) {
    return input === 'rock' || input === 'paper' || input === 'scissors';
}

function calculateWinner(playerSelection, computerSelection) {
    if ((playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper') ||
        (playerSelection === 'rock' && computerSelection === 'scissors')) {
        return 'player';
    } else return 'computer';
}

function getComputerChoice() {
    const randomChoice = Math.floor(Math.random() * 3);
    let choice = '';
    if (randomChoice === 0) {
        choice = 'rock';
    } else if (randomChoice === 1) {
        choice = 'paper';
    } else choice = 'scissors';
    console.log(`'Computer chose ${choice}'`);
    return choice;
}

function getPlayerChoice(choice) {
    console.log(`Player chose ${choice}`);
    return choice;
}

function game() {
    playRound(getPlayerChoice(), getComputerChoice());
}

