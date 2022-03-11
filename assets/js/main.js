// define elements
const gameAreas = document.querySelectorAll('.game-area');
const gameBoard = document.querySelector('.game-board');
const gameSqaures = document.querySelector('.game-squares');
const squares = document.querySelector('.squares');
const difficultyBtnsContainer = document.querySelector('#intro-btn-container');

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

/** creates the leader icon and adds data-path attribute to each square that it travels across */
const generateLeader = difficulty => {
    let square = document.querySelectorAll('.square');
    for (let i of square) {
        i.innerHTML = '';
    }
    square[leaderPosition].innerHTML = leader;
    square[leaderPosition].setAttribute('data-path', 'true');
}

/** updates the position of the leader */
const updateLeaderPosition = (move) => {
    leaderPosition += move;
}

/** determines if the leader is at the edge of the board, and then determines where the leader should move to */
const determineLeaderPosition = (difficulty) => {

    if (leaderPosition % Math.sqrt(difficulty.squares) % Math.sqrt(difficulty.squares) === (Math.sqrt(difficulty.squares) - 1)) {
        updateLeaderPosition(Math.sqrt(difficulty.squares));
        return;
    } else if (leaderPosition >= ((difficulty.squares) - (Math.sqrt(difficulty.squares)))) {
        updateLeaderPosition(1);
        return;
    }

    let randomNumber = Math.floor(Math.random() * 2);

    if (randomNumber === 0) {
        updateLeaderPosition(1)
        return;
    } else {
        updateLeaderPosition(Math.sqrt(difficulty.squares));
        return;
    }
}

/** begins the player's turn */
const playersTurn = (difficulty) => {
    console.log('players turn begins');
}

/** begins the leader's turn and ends it when the leader reaches the final square */
const leadersTurn = difficulty => {
    if (leaderPosition === (difficulty.squares) - 1) {
        generateLeader(difficulty);
        setTimeout(function() {
            playersTurn(difficulty);
        }, 1000);
        return;
    } else {
        generateLeader(difficulty);
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
    generateLeader(difficulty);
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