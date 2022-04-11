let player = null;
let winner = null;
let playerSelect = document.getElementById('jogador-selecionado');
let winnerSelect = document.getElementById('vencedor-selecionado');


changePlayer('X');

function squareClick (id) {

    if (winner !== null) {
        return;
    }

    let square = document.getElementById(id);

    if (square.innerHTML !== '-') {
        return
    }

    square.innerHTML = player;
    square.style.color = '#000'
    
    if (player === 'X') {
        player = 'O';
    } else {
        player = 'X';
    }
    
    changePlayer (player);
    checkWinner();
}

function changePlayer (value) {
   player = value;
   playerSelect.innerHTML = player; 
}

function checkWinner () {
    let square1 = document.getElementById('1');
    let square2 = document.getElementById('2');
    let square3 = document.getElementById('3');
    let square4 = document.getElementById('4');
    let square5 = document.getElementById('5');
    let square6 = document.getElementById('6');
    let square7 = document.getElementById('7');
    let square8 = document.getElementById('8');
    let square9 = document.getElementById('9');

    if (checkSequence(square1, square2, square3)){
        changeColor(square1, square2, square3);
        changeWinner(square1);
        return;
    }
    if (checkSequence(square4, square5, square6)){
        changeColor(square4, square5, square6);
        changeWinner(square4);
        return;
    }
    if (checkSequence(square7, square8, square9)){
        changeColor(square7, square8, square9);
        changeWinner(square7);
        return;
    }
    if (checkSequence(square1, square4, square7)){
        changeColor(square1, square4, square7);
        changeWinner(square1);
        return;
    } 
    if (checkSequence(square2, square5, square8)){
        changeColor(square2, square5, square8);
        changeWinner(square2);
        return;
    }
    if (checkSequence(square3, square6, square9)){
        changeColor(square3, square6, square9);
        changeWinner(square3);
        return;
    }
    if (checkSequence(square3, square5, square7)){
        changeColor(square3, square5, square7);
        changeWinner(square3);
        return;
    }
    if (checkSequence(square1, square5, square9)){
        changeColor(square1, square5, square9);
        changeWinner(square1);
    }
}

function changeWinner (square) {
    winner = square.innerHTML;
    winnerSelect.innerHTML = winner;
}

function changeColor (squareA, squareB, squareC) {
    squareA.style.background = '#0f0';
    squareB.style.background = '#0f0';
    squareC.style.background = '#0f0';
}

function checkSequence (squareA, squareB, squareC) {
    let sequence = false;

    if (squareA.innerHTML !== '-' && squareA.innerHTML === squareB.innerHTML && squareB.innerHTML === squareC.innerHTML) {
        sequence = true;
    }
    return sequence;
}

function restart () {
    winner = null;
    winnerSelect.innerHTML = '';

    for ( var i = 1; i<= 9; i++ ) {
        let restartSquare = document.getElementById(i);
        restartSquare.style.background = '#eee';
        restartSquare.style.color = '#eee';
        restartSquare.innerHTML = '-';
    }

    changePlayer('X');
}