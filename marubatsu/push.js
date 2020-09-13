'use strict';

let buttonCheck = [9];

let player = -1;

for (let i = 1; i < 10; i++) {
    const newButton = document.createElement('button');
    newButton.id = `Button${i}`;
    newButton.classList.add('Button');
    newButton.addEventListener('click', () => pushButton(i));
    const getGame = document.getElementById('game');
    getGame.appendChild(newButton);

    if (i % 3 === 0) {
        const newBr = document.createElement('br');
        getGame.appendChild(newBr);
    }

    buttonCheck[i]=0;
}

function colorChange(position, player) {
    buttonCheck[position] = player;

    if (buttonCheck[position] === 1) {
        document.getElementById(`Button${position}`).style.background = 'blue';
    } else if (buttonCheck[position] === -1) {
        document.getElementById(`Button${position}`).style.background = 'red';
    } else {
        document.getElementById(`Button${position}`).style.background = 'white';
    }

    return player === 1 ? -1 : 1;
}

function judge(fix) {
    if (fix === 3) {
        result.textContent = '青の勝ち';
        finish();
    } else if (fix === -3) {
        result.textContent = '赤の勝ち';
        finish();
    }
}

function finish() {
    for (let i = 1; i < 10; i++) {
        document.getElementById(`Button${i}`).disabled = true;
    }
}

function pushButton(intNo) {
    
    if (buttonCheck[intNo] === 0) {
        player = colorChange(intNo, player);
    }

    let check = 0;
    for (let i = 1; i < 10; i ++) {
        if (buttonCheck[i] === 0) {
            check = check + 1;
        }
    }
    if (check === 0) {
        result.textContent = '引き分け';
    }

    let fix = 0;
    for (let i = 1; i < 10; i += 3) {
        for(let j = i; j < 3 + i; j++) {
            fix = fix + buttonCheck[j];
            judge(fix);
        }
        fix = 0;
    }

    for (let i = 1; i < 4; i++) {
        for(let j = 1 * i; j < 10; j += 3) {
            fix = fix + buttonCheck[j];
            judge(fix);
        }
        fix = 0;
    }

    for (let i = 1; i < 10; i += 4) {
        fix = fix + buttonCheck[i];
        judge(fix);
    }
    fix = 0;

    for (let i = 3; i < 8; i += 2) {
        fix = fix + buttonCheck[i];
        judge(fix);
    }
    fix = 0;
}