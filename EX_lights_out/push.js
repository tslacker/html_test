'use strict';

let buttonCheck = [];

for (let i = 0; i < 25; i++) {
    const newButton = document.createElement('button');
    newButton.id = `Button${i}`;
    newButton.addEventListener('click', () => pushButton(i));
    const getGame = document.getElementById('game');
    getGame.appendChild(newButton);
    if (i % 5 === 4) {
        const newBr = document.createElement('br');
        getGame.appendChild(newBr);
    }
    buttonCheck.push(true);
    document.getElementById(`Button${i}`).style.background = 'blue';
}

for (let i = 0; i < 101; i++) {
    pushButton(Math.floor(Math.random() * 25));
}

function colorChange(position) {
    buttonCheck[position] = !(buttonCheck[position]);

    if (buttonCheck[position]) {
        document.getElementById(`Button${position}`).style.background = 'blue';
    } else {
        document.getElementById(`Button${position}`).style.background = 'red';
    }
}

function pushButton(intNo) {    
    colorChange(intNo);

    if (intNo > 4) {
        colorChange(intNo - 5);
    }
    if (intNo < 20) {
        colorChange(intNo + 5);
    }
    if (intNo % 5 !== 0) {
        colorChange(intNo - 1);
    }
    if (intNo % 5 !== 4) {
        colorChange(intNo + 1);
    }

    // aに対してa + c の結果がリターンされる。
    const fix = buttonCheck.reduce( (a, c) => c ? a + 1 : a , 0);

    if (fix === 25) {
        result.textContent = 'ゲームクリアー';
    }
}