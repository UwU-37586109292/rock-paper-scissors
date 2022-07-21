
/*
Algorithm:
Computer randomly selects one of 3 choices: rock/paper/scissors
Ask user for input (rock/paper/scissors)
Compare results (rock>scissors>paper>rock)
Output the result
*/

function getComputerChoice() {
    const randomChoice = Math.floor(Math.random() * 3);
    if (randomChoice === 0) {
        return 'rock';
    } else if (randomChoice === 1) {
        return 'paper';
    } else return 'scissors';
}

console.log(`Computer chose: ` + getComputerChoice());