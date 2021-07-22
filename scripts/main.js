const gameBoard = (() => {
    let gameboard = [];
    const displayGameBoard = () => {
        const board = document.createElement('div');
        board.classList.add('board');
        for(let i=0;i<9;i++) {
            const box = document.createElement('div');
            box.classList.add('box');
            box.dataset.box = i+1;
            box.textContent = gameboard[i];
            board.appendChild(box);
            box.addEventListener('click', game.play);
        }
        document.querySelector('#container').appendChild(board);
    };
    return {gameboard, displayGameBoard};
})();

const player = () => {
    let marker;
    return {marker};
};

const game = (() => {
    let turnPlayer;
    const player1 = player();
    const player2 = player();
    const start = () => {
        playBtn.classList.toggle('hidden');
        gameBoard.displayGameBoard();
        player1.marker = 'X';
        player2.marker = 'O';
    }
    const playRound = () => {
        if(player1 === turnPlayer) {
            turnPlayer = player2;
        }
        else {
            turnPlayer = player1;
        }
    }
    const play = (e) => {
        const selectedBox = document.querySelector(`div[data-box="${e.target.dataset.box}"]`);
        if(selectedBox.textContent === player1.marker || selectedBox.textContent === player2.marker) return;
        playRound();
        selectedBox.textContent = turnPlayer.marker;
        console.log(e.target.dataset.box);
    };
    return {start, play};
})();

const playBtn = document.querySelector('#play_button');
playBtn.addEventListener('click', game.start);