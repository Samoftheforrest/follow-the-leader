// define elements
const gameAreas = document.querySelectorAll('.game-area');
const gameBoard = document.querySelector('.game-board');
const gameSqaures = document.querySelector('.game-squares');
const introScreen = document.querySelector('.intro-screen');
const loseScreen = document.querySelector('.lose-screen');
const squares = document.querySelector('.squares');
const difficultyBtnsContainer = document.querySelector('#intro-btn-container');
const score = document.querySelectorAll('.score');
const message = document.querySelector('.message');
const title = document.querySelector('.main-title');
const playAgainBtn = document.querySelector('.play-again');
const changeDifficultyBtn = document.querySelector('.change-difficulty');

let playerPosition = 0;
let leaderPosition = 0;
let leader = '<div class="leader"></div>';
let player = '<div class="player"></div>';
let currentScore = 0;
let keyListenerActive = false;
let movementEnabled = false;
let reset = false;

// success messages
const successMessage = ['Well done soldier! Keep going!', 'Another one, home safe', 'Mission successful, good job!', 'Good work private!', 'Nicely done, let\'s keep moving!'];

// difficulty settings
const difficulties = [{
    mode: 'Easy',
    squares: 16,
    startingSpeed: 1.5
}, {
    mode: 'Medium',
    squares: 25,
    startingSpeed: 1.25
}, {
    mode: 'Hard',
    squares: 49,
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
    score.forEach(score => {
        score.textContent = currentScore;
    })
};
setScore();

const setMessage = () => {
    let randomNumber = Math.floor(Math.random() * (successMessage.length));

    message.textContent = successMessage[randomNumber];
}

/** removes any characters from all squares on the board */
const clearSquares = () => {
    const square = document.querySelectorAll('.square');

    for (let i of square) {
        i.innerHTML = '';
    }
}

/** creates the leader icon and adds data-path attribute to each square that it travels across */
const generateCharacter = (position) => {
    const square = document.querySelectorAll('.square');

    clearSquares();

    if (position === 'leader') {
        square[leaderPosition].innerHTML = leader;
        square[leaderPosition].setAttribute('data-path', '');
    } else {
        square[playerPosition].innerHTML = player;
    }
}

const startNewRound = function(difficulty) {
    leaderPosition = 0;
    playerPosition = 0;
    difficulty.startingSpeed *= 0.95;
    movementEnabled = false;
    const difficultyBtns = document.querySelectorAll('.intro-btn');
    const squares = document.querySelectorAll('.square');
    difficultyBtns.forEach(btn => {
        btn.remove();
    })
    squares.forEach(square => {
        square.remove();
    })
    gameAreas.forEach((area) => {
        area.classList.add('d-none');
    });
    startGame(difficulty);
}

const playerWins = difficulty => {
    setMessage();
    setTimeout(function() {
        clearSquares();
        currentScore++;
        setScore();
        startNewRound(difficulty);
    }, (difficulty.startingSpeed * 1000));
}

const playerLoses = difficulty => {
    gameAreas.forEach(area => {
        area.classList.add('d-none');
    });
    loseScreen.classList.remove('d-none');
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

    movementEnabled = false;

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
const playerMovement = difficulty => {

    const squares = document.querySelectorAll('.square');
        if (playerPosition < (difficulty.squares - 1)) {
        const addClickListeners = function() {
            if (playerPosition === (difficulty.squares - 1)) {
                squares.forEach(square => {
                    square.removeEventListener('click', mouseMovement);
                })
                return;
            }
            if (playerPosition >= (difficulty.squares - (Math.sqrt(difficulty.squares)))) {
                squares.forEach(square => {
                    square.removeEventListener('click', mouseMovement);
                })
                squares[playerPosition + 1].addEventListener('click', mouseMovement);
                return;
            } else if (playerPosition % Math.sqrt(difficulty.squares) === (Math.sqrt(difficulty.squares) - 1)) {
                squares.forEach(square => {
                    square.removeEventListener('click', mouseMovement);
                })
                squares[playerPosition + Math.sqrt(difficulty.squares)].addEventListener('click', mouseMovement);
                return;
            } else {
                squares[playerPosition + 1].addEventListener('click', mouseMovement);
                squares[playerPosition + Math.sqrt(difficulty.squares)].addEventListener('click', mouseMovement);
            }
        }

        const mouseMovement = function(e) {
            if (e.target === squares[playerPosition + 1]) {
                updateCharacterPosition('player', 1, difficulty);
            } else {
                updateCharacterPosition('player', Math.sqrt(difficulty.squares), difficulty);
            }
            squares.forEach(square => {
                square.removeEventListener('click', mouseMovement);
            });
            addClickListeners();
        }

        squares[playerPosition + 1].addEventListener('click', mouseMovement);
        squares[playerPosition + Math.sqrt(difficulty.squares)].addEventListener('click', mouseMovement);

        const keyboardMovement = function (e) {
            if (playerPosition !== (difficulty.squares - 1)) {
                if (movementEnabled === false) {
                    return;
                }
                if (e.key === "ArrowRight") {
                    if (playerPosition % Math.sqrt(difficulty.squares) === (Math.sqrt(difficulty.squares) - 1)) {
                        return;
                    };
                    updateCharacterPosition('player', 1, difficulty);
                    addClickListeners();
                } else if (e.key === "ArrowLeft") {
                    if (playerPosition % Math.sqrt(difficulty.squares) === 0) {
                        return;
                    };
                    updateCharacterPosition('player', -1, difficulty);
                    addClickListeners();
                } else if (e.key === "ArrowDown") {
                    if (playerPosition >= (difficulty.squares - (Math.sqrt(difficulty.squares)))) {
                        return;
                    };
                    updateCharacterPosition('player', Math.sqrt(difficulty.squares), difficulty);
                    addClickListeners();
                } else if (e.key === "ArrowUp") {
                    if (playerPosition < Math.sqrt(difficulty.squares)) {
                        return;
                    };
                    updateCharacterPosition('player', -`${Math.sqrt(difficulty.squares)}`, difficulty);
                    addClickListeners();
                } else {
                    // stops other keys making character disappear
                    return;
                }
            }
        }
        if (keyListenerActive === false) {
            document.body.addEventListener('keydown', keyboardMovement);
            keyListenerActive = true;
        }
    }
};

/** begins the player's turn */
const playersTurn = (difficulty) => {
    clearSquares();
    generateCharacter('player');
    movementEnabled = true;
    playerMovement(difficulty);
}

/** begins the leader's turn and ends it when the leader reaches the final square */
const leadersTurn = (difficulty) => {

    message.textContent = 'This way private. Follow me!';

    if (!reset) {
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
}

/** begins the game - generates the board's square and leader, and begins the leader's turn */
const startGame = difficulty => {
    reset = false;
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
    difficulties.forEach( (difficulty) => {
        const button = document.createElement('a');
        button.setAttribute('href', '#');
        button.setAttribute('class', 'intro-btn');
        button.setAttribute('aria-label', `start game on ${difficulty.mode} mode`);
        button.innerText = difficulty.mode;
        button.addEventListener('click', function() {
            startGame(difficulty);
        });
        difficultyBtnsContainer.appendChild(button);
    });
}

createDifficultyButtons();

const resetGame = function() {
    window.location.reload();
}

// event listeners 
playAgainBtn.addEventListener('click', resetGame);
title.addEventListener('click', resetGame);
