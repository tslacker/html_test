'use strict';

(() => {
    let buttonCheck = [];
    let player = -1;

    for (let i = 0; i < 15; i++) {
        let setData = [];
        for(let j = 0; j < 15; j++) {
            const newButton = document.createElement('button');

            if (i === 0 && j === 0) {
                newButton.id = "Buttonl0w0";
            } else {
                newButton.id = `Buttonl${i}w${j}`;
            }
            newButton.classList.add('Button');
            if (i === 7 && j === 7) {
                newButton.style.background = 'black';
                setData.push(1);
            } else {
                setData.push(0);
                newButton.style.background = 'brown';
            }
            newButton.addEventListener('click', () => pushButton(i, j));
            const getGame = document.getElementById('game');
            getGame.appendChild(newButton);

            if (j === 14 && j != 0) {
                const newBr = document.createElement('br');
                getGame.appendChild(newBr);
            }
        }
        buttonCheck.push(setData);
    }

    function colorSet(setLow, setColumn, player) {
        buttonCheck[setLow][setColumn] = player;

        if (buttonCheck[setLow][setColumn] === 1) {
            document.getElementById(`Buttonl${setLow}w${setColumn}`).style.background = 'black';
        } else if (buttonCheck[setLow][setColumn] === -1) {
            document.getElementById(`Buttonl${setLow}w${setColumn}`).style.background = 'white';
        }
        
        return player === 1 ? -1 : 1;
    }

    function judge(fix) {
        if (fix === 5) {
            result.textContent = '黒の勝ち';
            finish();
        } else if (fix === -5) {
            result.textContent = '白の勝ち';
            finish();
        }
    }

    function finish() {
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                document.getElementById(`Buttonl${i}w${j}`).disabled = true;
            }
        }
    }

    function pushButton(setLow, setColumn) {
        const low = parseInt(setLow);
        const column = parseInt(setColumn);
        if (buttonCheck[low][column] === 0) {
            player = colorSet(low, column, player);
        }

        if (!buttonCheck.flat(Infinity).includes(0)) {
            result.textContent = '引き分け';
        }

        let fix = 0;
        for (let i = 0; i < 15; i++) {
            fix = fix + buttonCheck[low][i];
            if (fix === 5) {
                break;
            }
            if (buttonCheck[low][i] === player) {
                fix = 0;
            }
        }
        judge(fix);
        fix = 0;

        for (let i = 0; i < 15; i++) {
            fix = fix + buttonCheck[i][column];
            if (fix === 5) {
                break;
            }
            if (buttonCheck[i][column] === player) {
                fix = 0;
            }
        }
        judge(fix);
        fix = 0;

        if (low < column) {
            let i = 0;
            for (let j = column - low; j < 15; j++) {
                fix = fix + buttonCheck[i][j];
                if (fix === 5) {
                    break;
                }
                if (buttonCheck[i][column] === player) {
                    fix = 0;
                }
                i++;
            }
        } else {
            let j = 0;
            for (let i = low - column; i < 15; i++) {
                fix = fix + buttonCheck[i][j];
                if (fix === 5) {
                    break;
                }
                if (buttonCheck[i][column] === player) {
                    fix = 0;
                }
                j++;
            }
        }
        judge(fix);
        fix = 0;

        if (low - 14 + column > 1) {
            let j = 14;
            for (let i = low - 14 + column; i < 15; i++) {
                fix = fix + buttonCheck[i][j];
                if (fix === 5) {
                    break;
                }
                if (buttonCheck[i][j] === player) {
                    fix = 0;
                }
                j--;
            }
        } else {
            let i = 0;
            for (let j = low + column; j > 0; j--) {
                fix = fix + buttonCheck[i][j];
                if (fix === 5) {
                    break;
                }
                if (buttonCheck[i][j] === player) {
                    fix = 0;
                }
                i++;
            }
        }
        judge(fix);
    }
})();