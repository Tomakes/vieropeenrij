var tableRow = document.getElementsByTagName('tr');
var tableData = document.getElementsByTagName('td');
var playerTurn = document.querySelector('.player-turn');
const slots = document.querySelectorAll('.slot');
const resetButton = document.querySelector('.reset');
const refreshPage = () => {
    location.reload();
}

while (!player1){
    var player1 = prompt('Eerste speler: Kies je naam. Je bent rood.');
};
var player1Color = 'red';

while (!player2){
    var player2 = prompt('Tweede speler: Kies je naam. Je bent geel.');
};
var player2Color = 'yellow';


var currentPlayer = 1;
let winner;
playerTurn.textContent = `${player1}'s beurt!`



function changeColor(e){
    let column = e.target.cellIndex;
    let row = [];

    for (i = 5; i > -1; i--){
        if (tableRow[i].children[column].style.backgroundColor == 'white'){
            row.push(tableRow[i].children[column]);
            if (currentPlayer === 1){
                row[0].style.backgroundColor = 'red';
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    playerTurn.textContent = `${player1} Wint!!`;
                    playerTurn.style.color = player1Color;
                    return alert(`${player1} Wint!!`);
                }else if (drawCheck()){
                    playerTurn.textContent = 'Gelijk spel!';
                    return alert('Gelijk spel!');
                }else{
                    playerTurn.textContent = `${player2}'s beurt`
                    return currentPlayer = 2;
                }
            }else{
                row[0].style.backgroundColor = 'yellow';
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    playerTurn.textContent = `${player2} Wint!!`;
                    playerTurn.style.color = player2Color;
                    return alert(`${player2} Wint!!`);
                }else if (drawCheck()){
                    playerTurn.textContent = 'Gelijk spel!';
                    return alert('Gelijk spel!');
                }else{
                    playerTurn.textContent = `${player1}'s beurt`;
                    return currentPlayer = 1;
                }

            }
        }
    }

}

Array.prototype.forEach.call(tableData, (cell) => {
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'white';
});

function colorMatchCheck(one, two, three, four){
    return (one === two && one === three && one === four && one !== 'white' && one !== undefined);
}

function horizontalCheck(){
    for (let row = 0; row < tableRow.length; row++){
        for (let col =0; col < 4; col++){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor,tableRow[row].children[col+1].style.backgroundColor,
                tableRow[row].children[col+2].style.backgroundColor, tableRow[row].children[col+3].style.backgroundColor)){
                return true;
            }
        }
    }
}

function verticalCheck(){
    for (let col = 0; col < 7; col++){
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col].style.backgroundColor,
                tableRow[row+2].children[col].style.backgroundColor,tableRow[row+3].children[col].style.backgroundColor)){
                return true;
            };
        }
    }
}

function diagonalCheck(){
    for(let col = 0; col < 4; col++){
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col+1].style.backgroundColor,
                tableRow[row+2].children[col+2].style.backgroundColor,tableRow[row+3].children[col+3].style.backgroundColor)){
                return true;
            }
        }
    }

}

function diagonalCheck2(){
    for(let col = 0; col < 4; col++){
        for (let row = 5; row > 2; row--){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row-1].children[col+1].style.backgroundColor,
                tableRow[row-2].children[col+2].style.backgroundColor,tableRow[row-3].children[col+3].style.backgroundColor)){
                return true;
            }
        }
    }
}

function drawCheck(){
    let fullSlot = []
    for (i=0; i < tableData.length; i++){
        if (tableData[i].style.backgroundColor !== 'white'){
            fullSlot.push(tableData[i]);
        }
    }
    if (fullSlot.length === tableData.length){
        return true;
    }
}

resetButton.addEventListener('click', refreshPage)