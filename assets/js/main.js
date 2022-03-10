// define elements
let gameAreas = document.querySelectorAll('.game-area');
let gameBoard = document.querySelector('.game-board');
let gameSqaures = document.querySelector('.game-squares');
let squares = document.querySelector('.squares');
let difficultyBtns = document.querySelectorAll('.intro-btn');
let [easyBtn, mediumBtn, hardBtn] = difficultyBtns;

let playerPosition = 0;
let leaderPosition = 0;
let leader = '<div class="leader"></div>';
let player = '<div class="player"></div>'

// difficulty settings
const difficulties = [{
    mode: 'Easy',
    squares: 16,
    startingSpeed: 1.5
}, {
    mode: 'Medium',
    squares: 49,
    startingSpeed: 1.25
}, {
    mode: 'Hard',
    squares: 100,
    startingSpeed: 1
}];

// functions
const startGame = function(mode) {
    gameAreas.forEach((area) => {
        area.classList.add('d-none');
    });
    gameBoard.classList.remove('d-none');
    generateSquares(mode);
    leadersTurn(mode);
}

/**This function generates the amount of sqaures based off the mode's squares in the difficulties object and sets their width */
const generateSquares = function(mode) {
    for (let i = 0; i < difficulties[mode].squares; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        square.classList.add(i);
        square.style.width = `${100 / (Math.sqrt(difficulties[mode].squares))}%`;
        square.style.height = `${100 / (Math.sqrt(difficulties[mode].squares))}%`;
        squares.append(square);
    }
};

const leadersTurn = function(mode) {
    let square = document.querySelectorAll('.square');
    let randomNumber = Math.floor(Math.random() * 2);
    square[leaderPosition].innerHTML = leader;

    let leaderMoves = function() {
        
    }
}

// event listeners
difficultyBtns.forEach((btn, i) => {
    btn.addEventListener('click', function() {
        startGame(i);
    });
})