const gameBoard = (() => {

    let gameboard = [];
    gameboard.length = 9;

    const displayGameBoard = () => {
        const board = document.createElement('div');
        board.classList.add('board');
        for(let i=0;i<9;i++) {
            const box = document.createElement('div');
            box.classList.add('box');
            box.dataset.box = i;
            box.textContent = gameboard[i];
            board.appendChild(box);
            box.addEventListener('click', game.play);
        }
        const restartBtn = document.createElement('button');
        restartBtn.id = 'restart_btn';
        restartBtn.textContent = 'RESTART';
        restartBtn.addEventListener('click', game.restart);
        document.querySelector('#container').append(board, restartBtn);
    };

    return {gameboard, displayGameBoard};
})();

const player = () => {

    let name;

    let marker;

    return {name, marker};
};

const aI = (() => {
    let isFirstMove = true;

    let move;

    const makeFirstMove = () => {
        do {
            move = Math.floor(Math.random()*9);
        } while(gameBoard.gameboard[move]!==undefined);
        gameBoard.gameboard[move] = 'O';
        document.querySelector(`div[data-box="${move}"]`).textContent = 'O';
        aI.isFirstMove = false;
    };

    const makeMove = () => {

    };
    
    return {isFirstMove, makeFirstMove, makeMove};
})();

const game = (() => {

    let turnPlayer;

    const player1 = player();

    const player2 = player();

    const start = () => {
        playBtn.classList.toggle('hidden');
        gameBoard.displayGameBoard();
        player1.marker = 'X';
        player2.marker = 'O';
        do {
        player1.name = prompt('Player 1 name:', 'Player 1');
        } while (player1.name===null || player1.name === '');
        do {
        player2.name = prompt('Player 2 name:', 'Player 2');
        } while (player2.name===null || player2.name === '');
    };

    const playRound = (selectedBox) => {
        turnPlayer = player1;
        selectedBox.textContent = gameBoard.gameboard[selectedBox.dataset.box] = turnPlayer.marker;
        if(checkGame()) return;
        turnPlayer = player2;
        if(aI.isFirstMove) aI.makeFirstMove();
        else aI.makeMove();
        checkGame();
    };

    const play = (e) => {
        const selectedBox = document.querySelector(`div[data-box="${e.target.dataset.box}"]`);
        if(selectedBox.textContent === player1.marker || selectedBox.textContent === player2.marker) return;
        playRound(selectedBox);
    };

    const isGameOver = () => {
        if((gameBoard.gameboard[0]===turnPlayer.marker && gameBoard.gameboard[1]===turnPlayer.marker && gameBoard.gameboard[2]===turnPlayer.marker)||
            (gameBoard.gameboard[3]===turnPlayer.marker && gameBoard.gameboard[4]===turnPlayer.marker && gameBoard.gameboard[5]===turnPlayer.marker)||
            (gameBoard.gameboard[6]===turnPlayer.marker && gameBoard.gameboard[7]===turnPlayer.marker && gameBoard.gameboard[8]===turnPlayer.marker)||
            (gameBoard.gameboard[0]===turnPlayer.marker && gameBoard.gameboard[3]===turnPlayer.marker && gameBoard.gameboard[6]===turnPlayer.marker)||
            (gameBoard.gameboard[1]===turnPlayer.marker && gameBoard.gameboard[4]===turnPlayer.marker && gameBoard.gameboard[7]===turnPlayer.marker)||
            (gameBoard.gameboard[2]===turnPlayer.marker && gameBoard.gameboard[5]===turnPlayer.marker && gameBoard.gameboard[8]===turnPlayer.marker)||
            (gameBoard.gameboard[0]===turnPlayer.marker && gameBoard.gameboard[4]===turnPlayer.marker && gameBoard.gameboard[8]===turnPlayer.marker)||
            (gameBoard.gameboard[2]===turnPlayer.marker && gameBoard.gameboard[4]===turnPlayer.marker && gameBoard.gameboard[6]===turnPlayer.marker)) {
            return true;
        }
        return false;
    };

    const isATie = () => {
        if(gameBoard.gameboard.includes(undefined)) return false;
        return true;
    };

    const gameOver = () => {
        const gameBoardDisabler = document.createElement('div');
        gameBoardDisabler.id = 'game_board_disabler';
        const gameOverSign = document.createElement('div');
        gameOverSign.id = 'game_over';
        const para1 = document.createElement('p');
        para1.id = 'game_over_text';
        para1.textContent = "GAME OVER!";
        const para2 = document.createElement('p');
        para2.id = 'game_over_tie';
        para2.textContent = `${turnPlayer.name} wins!`;
        gameOverSign.append(para1, para2);
        gameBoardDisabler.appendChild(gameOverSign);
        document.querySelector('.board').appendChild(gameBoardDisabler);
        return true;
    };
    
    const tie = () => {
        const gameBoardDisabler = document.createElement('div');
        gameBoardDisabler.id = 'game_board_disabler';
        const gameOverSign = document.createElement('div');
        gameOverSign.id = 'game_over';
        const para1 = document.createElement('p');
        para1.id = 'game_over_text';
        para1.textContent = "GAME OVER!";
        const para2 = document.createElement('p');
        para2.id = 'game_over_winner';
        para2.textContent = `It's a tie!`;
        gameOverSign.append(para1, para2);
        gameBoardDisabler.appendChild(gameOverSign);
        document.querySelector('.board').appendChild(gameBoardDisabler);
        return true;
    };

    const checkGame = () => {
        if(isGameOver()) return gameOver();
        if(isATie()) return tie();
    }

    const restart = () => {
        gameBoard.gameboard.length = 0;
        gameBoard.gameboard.length = 9;
        aI.isFirstMove = true;
        document.querySelectorAll('#container *').forEach(e => e.remove());
        gameBoard.displayGameBoard();
    };

    return {start, play, restart};
})();

const playBtn = document.querySelector('#play_button');
playBtn.addEventListener('click', game.start);