// const modal = document.getElementById('openModal');
// modal.addEventListener('click', ()=>{
//     dialog.showModal()
// })

const board = document.querySelector('.card-container');
const message = document.querySelector('.message');
const resetBtn = document.querySelector('#reset');
let numberOfPlayers = 1;
let turns = 0;
let gameOver = false;

// arrays of winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// create the board
    for(let i = 0; i < 9; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.cellId = i;
        board.appendChild(cell);
    }
    const cells = Array.from(document.querySelectorAll('.cell'))
// create event listener for squares
    document.addEventListener('click', e =>{
        if(gameOver === true) return
        if(!e.target.matches('.cell')) return
        if(e.target.matches('.player-one')) return
        if(numberOfPlayers === 1) onePlayer(e)
    })
// event listener for reset button
     resetBtn.addEventListener("click", reset)

     // if one player, play with computer
    const onePlayer = (e) => {
        e.target.classList.add('player-one');
        checkForWinner();
        if(!gameOver) {
            const emptyCells = cells.filter (cell => {
                return !cell.classList.contains('player-one') && !cell.classList.contains('player-two');
            })
            console.log(emptyCells)
            if(emptyCells.length !== 0) {
                message.textContent = 'Computers Turn';
                computer(emptyCells)
                checkForWinner()
            } 
            else{
                message.textContent = 'Game Over';
                gameOver = true
            }
        }
    }

    // computer player
    function computer(emptycells) {
        setTimeout(() => {
            let random = Math.round(Math.random() * (emptycells.length-1))
            if (random === -1) random = random + 1
            emptycells[random].classList.add('player-two')
            message.innerText = "Your turn"
        }, 100)
        
    }

    // check for a winning combination
function checkForWinner() {
    winningCombinations.forEach(combination => {
        if (combination.every(index => cells[index].classList.contains('player-one'))) {
            message.textContent = "You Win!!!"
            console.log("You Win!!!")
            gameOver = true
        } else if (combination.every(index => cells[index].classList.contains('player-two'))) {
            message.textContent = "Computer Wins!!!"
            console.log("Computer Wins!!!")
            gameOver = true
        } 
    })
}

// reset the game
function reset() {
    cells.forEach(cell => {
        cell.classList.remove('player-one')
        cell.classList.remove('player-two')
        message.innerText = "Your turn"
        // if (numberOfPlayers === 2) message.innerText = "Player Ones turn"
        turns = 0
        gameOver = false
    })
}