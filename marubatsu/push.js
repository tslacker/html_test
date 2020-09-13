'use strict';

let buttonCheck = [];

let player = 1;

for (let i = 1; i < 10; i++) {
    const newButton = document.createElement("button");
    newButton.id = `Button${i}`;
    newButton.addEventListener("click", () => pushButton(i));
    const getGame = document.getElementById("game");
    getGame.appendChild(newButton);
    if (i % 3 === 0) {
        const newBr = document.createElement("br");
        getGame.appendChild(newBr);
    }
    buttonCheck.push(0);
    alert(buttonCheck[i]);
}

function colorChange(position) {
    if (buttonCheck[position] === 0) {
        buttonCheck[position] = intNo;
    }

    if (buttonCheck[position] === 1) {
        document.getElementById(`Button${position}`).style.background = 'blue';
    } else {
        document.getElementById(`Button${position}`).style.background = 'red';
    }
}

function pushButton(intNo) {    
    colorChange(intNo, player);

    player = player === 1 ? 0 : 1

    // aに対してa + c の結果がリターンされる。
    // const fix = buttonCheck.reduce( (a, c) => c ? a + 1 : a , 0);

    // if (fix === 3) {
    //     result.textContent = '青の勝ち';
    // } else if (fix === -3) {
    //     result.textContent = '赤の勝ち';
    // }
}