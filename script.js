const buttons = document.querySelectorAll('.button, .scissor-button, .papper-button, .rock-button');


// Initialize scores object
let scores = {
    playerWins: 0,
    computerWins: 0
};

// Retrieve scores from localStorage if available
if (localStorage.getItem('scores')) {
    scores = JSON.parse(localStorage.getItem('scores'));
}
function saveScores() {
    localStorage.setItem('scores', JSON.stringify(scores));
}

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {

        const playerMove = e.target.getAttribute('src');
        const result = play(playerMove);
        document.querySelector('.ChooseMove').style.display = 'none';
        document.querySelector('.game-result').style.display = 'block';
         saveScores()
      
    });
});

//funtion to generate random comuter move
function pickComputerMove() {
    const moves = ['rock.svg', 'papper.svg', 'scissor.svg']; 
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}



    function play(playerMove) {
        const computerMove = pickComputerMove();
        const playerElement = document.getElementById('playerMoveImage');
        const computerElement = document.getElementById('computerMoveImage');
    
        let result = '';
    
        if (playerMove === 'scissor.svg') {
            if (computerMove === 'scissor.svg') {
                result = 'Tie';
            } else if (computerMove === 'rock.svg') {
                result = 'You lost against Computer';
                scores.computerWins++;
            } else {
                result = 'You win against Computer';
                scores.playerWins++;
                document.querySelector('.next-button').style.display = 'block';

            }
        } else if (playerMove === 'papper.svg') {
            if (computerMove === 'papper.svg') {
                result = 'Tie';
            } else if (computerMove === 'scissor.svg') {
                result = 'You lost against Computer';
                scores.computerWins++;
            } else {
                result = 'You win against Computer';
                scores.playerWins++;
                document.querySelector('.next-button').style.display = 'block';

            }
        } else if (playerMove === 'rock.svg') {
            if (computerMove === 'rock.svg') {
                result = 'Tie';
            } else if (computerMove === 'paper.svg') {
                result = 'You lost against Computer';
                scores.computerWins++;
            } else {
                result = 'You win against Computer';
                scores.playerWins++;
                document.querySelector('.next-button').style.display = 'block';

            }
        }
        
    // Update scores in the HTML 
    updateScoreElement();

    document.getElementById('playerMoveImage').src = playerMove;
    document.getElementById('computerMoveImage').src = computerMove;
    document.querySelector('.js-result').textContent = ` ${result}`;


        //retaining  styles for  the moves     
    function setMove(moveType, moveImageId, isPlayerWinner) {
        const moveImage = document.getElementById(moveImageId);
        moveImage.className = '';
        const moveContainer = moveImage.parentElement;
        console.log(moveContainer)

        moveImage.classList.add(`${moveType}-button`);
        if (moveType === 'papper') {
            moveImage.classList.add('no-transform');
        }
    
        moveContainer.style.boxShadow = 'none';

    if (isPlayerWinner)
     {
        moveContainer.style.boxShadow = `
            10px 0 40px rgba(29, 168, 43, 0.79),
            0 0 0 20px rgba(29, 168, 43, 0.79), 
            10px 0 65px rgba(46, 154, 37, 0.39), 
            0 0 0 40px rgba(46, 154, 37, 0.39), 
            10px 0 70px rgba(59, 103, 32, 3),
            0 20px 60px rgba(59, 103, 32, 2)`;
    }
    }
    
    setMove(playerMove.replace('.svg', ''), 'playerMoveImage', result === 'You win against Computer');
    setMove(computerMove.replace('.svg', ''), 'computerMoveImage', result === 'You lost against Computer');

}


document.querySelector('.next-button').addEventListener('click', () => {
    document.querySelector('.winner-page').style.display = 'block';  
    document.querySelector('.game-result').style.display = 'none';
    document.querySelector('.Header').style.display = 'none';
    document.querySelector('.next-button').style.display = 'none';

});


document.querySelector('.play-again-button').addEventListener('click', () => {
    document.querySelector('.ChooseMove').style.display = 'block';   
    document.querySelector('.game-result').style.display = 'none';
    document.querySelector('.next-button').style.display = 'none';


});


updateScoreElement(); 

function updateScoreElement() {
    const userScoreElement = document.querySelector('.userScoreBox h1');
    const computerScoreElement = document.querySelector('.computerScoreBox h1');
    userScoreElement.textContent = scores.playerWins;
    computerScoreElement.textContent = scores.computerWins;
}

document.querySelector('.rules-button').addEventListener('click', () => {
    document.querySelector('.rulesDialog-box').style.display = 'block';
    document.querySelector('.cancel-icon').style.display = 'block';
  })

  document.querySelector('.cancel-icon').addEventListener('click', () => {
    document.querySelector('.rulesDialog-box').style.display = 'none';
    document.querySelector('.cancel-icon').style.display = 'none';
  })

  document.querySelector('.playAgain-button').addEventListener('click', () => {
    document.querySelector('.Header').style.display = 'block';
    location.reload();

    document.querySelector('.ChooseMove').style.display = 'block';   
    document.querySelector('.winner-page').style.display = 'none';  

  
});
