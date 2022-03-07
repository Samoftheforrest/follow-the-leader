// define elements
let gameAreas = document.querySelectorAll('.game-area');
let gameBoard = document.querySelector('.game-board');
let gameSqaures = document.querySelector('.game-squares');
let squares = document.querySelector('.squares');
let difficultyBtns = document.querySelectorAll('.intro-btn');
let [easyBtn, mediumBtn, hardBtn] = difficultyBtns;

// difficulty settings
const difficulties = [{
    mode: 'Easy',
    squares: 16
}, {
    mode: 'Medium',
    squares: 49
}, {
    mode: 'Hard',
    squares: 100
}];

// functions
const startGame = function(mode) {
    gameAreas.forEach((area) => {
        area.classList.add('d-none');
    });
    gameBoard.classList.remove('d-none');
    for (let i = 0; i < difficulties[mode].squares; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${100 / (Math.sqrt(difficulties[mode].squares))}%`;
        square.style.height = `${100 / (Math.sqrt(difficulties[mode].squares))}%`;
        squares.append(square);
    }
}

// event listeners
difficultyBtns.forEach((btn, i) => {
    btn.addEventListener('click', function() {
        startGame(i);
    });
})