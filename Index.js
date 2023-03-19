window.addEventListener('DOMContentLoaded', () => {

    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = 'x';
    let isGameActive = true;

     const playerx_won = 'Playerx_Won';
     const playero_won = 'Playero_Won';
     const Tie = "tie";

     const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]

     ];
     function handleResultValidation() {
        let roundWon = false;
        for( let i=0; i <= 7; i++ ){
            const winningConditions = winConditions[i];
            const a = board[winningConditions[0]];
            const b = board[winningConditions[1]];
            const c = board[winningConditions[2]];

            if( a === ' ' || b === '' || c === ''){
                continue;
            }
            if(a === b && b === c){
                roundWon = true;
                break;
            }
        }
        if(roundWon){
            announce(currentPlayer === 'x' ? playerx_won:playero_won);
            isGameActive = false;
            return;
        }
        if(!board.includes(''))
        announce(Tie);
     }

     const announce = (type) => {
        switch(type){
            case playero_won:
                announcer.innerHTML = 'player <span class ="playerO"  style=color:red >O</span>Won';
                break;
             case playerx_won:
                 announcer.innerHTML = 'player <span class ="playerX" >X </span> Won';
                break;
            case Tie:
                announcer.innerHTML = 'Tie';

        }
        announcer.classList.remove('hide');
     };
     const isValidAction = (tile) =>{
        if(tile.innerHTML === 'x' || tile.innerHTML === 'o'){
            return false;
        }
        return true;
     };

     const updateBoard = (index) =>{
        board[index] = currentPlayer;
     }

     const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'x' ? 'o' :'x';
        playerDisplay = innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);


     }

     const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive){
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
     }

     const resetBoard = () =>{
        board = ["", "", "", "", "", "", "", "", ""];
        isGameActive = true;
        announcer.classList.add('hide');

        if(currentPlayer === '0'){
            changePlayer();
        }
        tiles.forEach(tile => {
            tile.innerHTML = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
     }

     tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
     });


    resetButton.addEventListener('click', resetBoard);
});