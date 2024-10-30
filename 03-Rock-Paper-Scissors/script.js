
function getComputerChoice() {

    const choice = Math.floor(Math.random() * 3);

    if (choice === 1) {
        return "rock";
    } else if (choice === 2) {
        return "paper";
    } else {
        return "scissors";
    }

}

let humanScore = 0;
let computerScore = 0;
let rounds = 0;

const humanScoreSpan = document.querySelector('.humanScore');
const computerScoreSpan = document.querySelector('.computerScore');
const resultsDiv = document.querySelector('.results');
const roundsPlayed = document.querySelector('.rounds');
const restartGame = document.querySelector('.restartGame');

function updateScore() {
    humanScoreSpan.textContent = humanScore;
    computerScoreSpan.textContent = computerScore;
    roundsPlayed.textContent = rounds;
}

function checkWinner(){
    if(humanScore === 5){
        resultsDiv.textContent = "You Won the game!";
        showRestartButton();
    } else if (computerScore === 5){
        resultsDiv.textContent = "Computer won the game!";
        showRestartButton();
    } else if (rounds === 5){
        if(humanScore > computerScore){
            resultsDiv.textContent = "You Won the game!";
        } else if (computerScore > humanScore){
            resultsDiv.textContent = "Computer won the game!";
        } else if (humanScore === computerScore){
        resultsDiv.textContent = "The game is draw!";
        }
        disableButtons();
        showRestartButton();
    }
}

function showRestartButton(){
    restartGame.style.display ="block";
}

function hideRestartButton(){
    restartGame.style.display = "none";
}

function disableButtons() {
    const buttons = document.querySelectorAll('.buttonList button');
    buttons.forEach(button => button.disabled = true);
}

function resetGame(){
    humanScore = 0;
    computerScore = 0;
    rounds = 0;
    updateScore();
    resultsDiv.textContent="";
    hideRestartButton;
    enableButtons();
}

function enableButtons(){
    const buttons = document.querySelectorAll('.buttonList button');
        buttons.forEach(button => button.disabled = false);
}

function playRound(humanChoice, computerChoice) {

    let resultMessage = "";

   if(humanChoice === computerChoice){
    resultMessage = `It's a draw! Both chose ${humanChoice}.`
   } else if ( (humanChoice === "rock" && computerChoice === "scissors") || 
   (humanChoice === "scissors" && computerChoice === "paper") ||
   (humanChoice === "paper" && computerChoice === "rock")
   ) {
    humanScore++;
    resultMessage = `You win ${humanChoice} beats ${computerChoice}.`;
   } else {
    computerScore++;
    resultMessage = `You lose ${computerChoice} beats ${humanChoice}.`;
   }

   resultsDiv.textContent = resultMessage;
   rounds++;
   updateScore();
   checkWinner();
}


const buttonList = document.querySelector('.buttonList');

buttonList.addEventListener('click', (event) => {
    const humanChoice = event.target.className;
    const computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
});

restartGame.addEventListener('click', resetGame);