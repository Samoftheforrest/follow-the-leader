// define elements
const gameAreas = document.querySelectorAll('.game-area');
const gameBoard = document.querySelector('.game-board');
const gameSqaures = document.querySelector('.game-squares');
const squares = document.querySelector('.squares');
const difficultyBtnsContainer = document.querySelector('#intro-btn-container');
const score = document.querySelector('.score');

let playerPosition = 0;
let leaderPosition = 0;
let leader = '<div class="leader"></div>';
let player = '<div class="player"></div>';
let currentScore = 0;

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
/** generates the amount of sqaures based off the mode's squares in the difficulties object and sets their width */
const generateSquares = difficulty => {
    for (let i = 0; i < difficulty.squares; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${100 / (Math.sqrt(difficulty.squares))}%`;
        square.style.height = `${100 / (Math.sqrt(difficulty.squares))}%`;
        squares.append(square);
    }
};

const setScore = () => {
    score.textContent = currentScore;
};
setScore();

/** removes any characters from all squares on the board */
const clearSquares = () => {
    const square = document.querySelectorAll('.square');

    for (let i of square) {
        i.innerHTML = '';
    }
}

/** creates the leader icon and adds data-path attribute to each square that it travels across */
const generateCharacter = position => {
    const square = document.querySelectorAll('.square');

    clearSquares();

    if (position === 'leader') {
        square[leaderPosition].innerHTML = leader;
        square[leaderPosition].setAttribute('data-path', '');
    } else {
        square[playerPosition].innerHTML = player;
    }
}

const playerWins = difficulty => {
    console.log('player successful');
    playerMovement(difficulty, false);
    setTimeout(clearSquares, (difficulty.startingSpeed * 1000));
}

const playerLoses = difficulty => {
    console.log('Oh no! You\'ve stepped off the path!');
}

const winOrLose = (difficulty) => {
    const square = document.querySelectorAll('.square');
    if (playerPosition === (difficulty.squares) - 1) {
        playerWins(difficulty);
    } else if (!square[playerPosition].hasAttribute('data-path')) {
        playerLoses(difficulty);
    }
}

/** updates the position of the leader */
const updateCharacterPosition = (position, move, difficulty) => {
    if (position === 'leader') {
        leaderPosition += move;
    } else {
        playerPosition += move;
        generateCharacter('player');
        winOrLose(difficulty);
    }
}

/** determines if the leader is at the edge of the board, and then determines where the leader should move to */
const determineLeaderPosition = (difficulty) => {

    if (leaderPosition % Math.sqrt(difficulty.squares) === (Math.sqrt(difficulty.squares) - 1)) {
        updateCharacterPosition('leader', Math.sqrt(difficulty.squares));
        return;
    } else if (leaderPosition >= (difficulty.squares - (Math.sqrt(difficulty.squares)))) {
        updateCharacterPosition('leader', 1);
        return;
    }

    let randomNumber = Math.floor(Math.random() * 2);

    if (randomNumber === 0) {
        updateCharacterPosition('leader', 1)
        return;
    } else {
        updateCharacterPosition('leader', Math.sqrt(difficulty.squares));
        return;
    }
}

/** adds event listeners (both key and click) to allow the player to move */
const playerMovement = function(difficulty, type = true) {

    function keyboardMovement(e) {
        if (e.key === "ArrowRight") {
            if (playerPosition % Math.sqrt(difficulty.squares) === (Math.sqrt(difficulty.squares) - 1)) {
                return;
            };
            updateCharacterPosition('player', 1, difficulty);
            } else if (e.key === "ArrowLeft") {
            if (playerPosition % Math.sqrt(difficulty.squares) === 0) {
                return;
            };
            updateCharacterPosition('player', -1, difficulty);
            } else if (e.key === "ArrowDown") {
            if (playerPosition >= (difficulty.squares - (Math.sqrt(difficulty.squares)))) {
                return;
            };
            updateCharacterPosition('player', Math.sqrt(difficulty.squares), difficulty);
            } else if (e.key === "ArrowUp") {
            if (playerPosition < Math.sqrt(difficulty.squares)) {
                return;
            };
            updateCharacterPosition('player', -`${Math.sqrt(difficulty.squares)}`, difficulty);
            } else {
            // stops other keys making character disappear
            updateCharacterPosition('player', 0);
            }
    }

    // event listener was firing multiple times - use this SO answer to try new solutions (https://stackoverflow.com/questions/26146108/addeventlistener-firing-multiple-times-for-the-same-handle-when-passing-in-argum);
};

/** begins the player's turn */
const playersTurn = (difficulty) => {
    console.log('players turn begins');
    clearSquares();
    generateCharacter('player');
    playerMovement(difficulty);
}

/** begins the leader's turn and ends it when the leader reaches the final square */
const leadersTurn = difficulty => {
    if (leaderPosition === (difficulty.squares) - 1) {
        generateCharacter('leader');
        setTimeout(function() {
            playersTurn(difficulty);
        }, (difficulty.startingSpeed) * 1000);
        return;
    } else {
        generateCharacter('leader');
        determineLeaderPosition(difficulty);
        setTimeout(function() {
            leadersTurn(difficulty);
        }, (difficulty.startingSpeed) * 1000);
    }
}

/** begins the game - generates the board's square and leader, and begins the leader's turn */
const startGame = difficulty => {
    gameAreas.forEach((area) => {
        area.classList.add('d-none');
    });
    gameBoard.classList.remove('d-none');
    generateSquares(difficulty);
    generateCharacter(difficulty);
    leadersTurn(difficulty);
}

/** creates the difficulty buttons for the user to select from */
const createDifficultyButtons = () => {
    difficulties.forEach((difficulty, i) => {
        const button = document.createElement('a');
        button.setAttribute('href', '#');
        button.setAttribute('class', 'intro-btn');
        button.innerText = difficulty.mode;
        button.addEventListener('click', function() {
            startGame(difficulty);
        });
        difficultyBtnsContainer.appendChild(button);
    })
}

createDifficultyButtons();