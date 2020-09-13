'use strict';

(() => {
    let buttonCheck = [];

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
        for (let i = 1; i <= 9; i++) {
            document.getElementById(`Button${i}`).disabled = true;
        }
    }

    function pushButton(intNo) {
        
        if (buttonCheck[intNo] === 0) {
            player = colorChange(intNo, player);
        }

        if (!buttonCheck.includes(0)) {
            result.textContent = '引き分け';
        }

        for (let i = 1; i <= 9; i += 3) {
            let fix = 0;
            for(let j = i; j < 3 + i; j++) {
                fix = fix + buttonCheck[j];
            }
            judge(fix);
        }

        for (let i = 1; i <= 3; i++) {
            let fix = 0;
            for(let j = 1 * i; j <= 9; j += 3) {
                fix = fix + buttonCheck[j];
            }
            judge(fix);
        }

        judge(buttonCheck[1] + buttonCheck[5] + buttonCheck[9]);
        judge(buttonCheck[3] + buttonCheck[5] + buttonCheck[7]);
    }
})();