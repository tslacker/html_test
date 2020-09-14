'use strict';

(() => {
    let buttonCheck = [];
    let buttons = [];
    let player = -1;

    const getGame = document.getElementById('game');
    for (let i = 0; i < 15; i++) {
        const setData = [];
        buttons.push([]);
        for(let j = 0; j < 15; j++) {
            const newButton = document.createElement('button');
            if (i === 7 && j === 7) {
                newButton.style.background = 'black';
                setData.push(1);
            } else {
                setData.push(0);
                newButton.style.background = 'brown';
            }
            newButton.addEventListener('click', () => pushButton(i, j));
            getGame.appendChild(newButton);
            buttons[i].push(newButton);
        }
        const newBr = document.createElement('br');
        getGame.appendChild(newBr);
        buttonCheck.push(setData);
    }

    function colorSet(setRow, setColumn, player) {
        buttonCheck[setRow][setColumn] = player;

        if (buttonCheck[setRow][setColumn] === 1) {
            buttons[setRow][setColumn].style.background = 'black';
        } else if (buttonCheck[setRow][setColumn] === -1) {
            buttons[setRow][setColumn].style.background = 'white';
        }
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
                buttons[i][j].disabled = true;
            }
        }
    }

    function pushButton(setrow, setColumn) {
        const row = parseInt(setrow);
        const column = parseInt(setColumn);
        if (buttonCheck[row][column] === 0) {
            colorSet(row, column, player);
        }

        if (!buttonCheck.flat(Infinity).includes(0)) {
            result.textContent = '引き分け';
        }

        let fix = 0;
        for (const v of buttonCheck[row]) {
            if (v === player) {
                fix += v;
                if (fix >= 5 || fix <= -5) {
                    judge(fix);
                    return;
                }
            } else {
                fix = 0;
            }
        }
        fix = 0;

        for (let i = 0; i < 15; i++) {
            if (buttonCheck[i][column] === player) {
                fix += buttonCheck[i][column];
                if (fix >= 5 || fix <= -5) {
                    judge(fix);
                    return;
                }
            } else {
                fix = 0;
            }
        }
        fix = 0;

        if (row < column) {
            for (let i = 0, j = column - row; j < 15; i++, j++) {
                if (buttonCheck[i][j] === player) {
                    fix += buttonCheck[i][j];
                    if (fix >= 5 || fix <= -5) {
                        judge(fix);
                        return;
                    }
                } else {
                    fix = 0;
                }
            }
        } else {
            for (let i = row - column, j = 0; i < 15; i++, j++) {
                if (buttonCheck[i][j] === player) {
                    fix += buttonCheck[i][j];
                    if (fix >= 5 || fix <= -5) {
                        judge(fix);
                        return;
                    }
                } else {
                    fix = 0;
                }
            }
        }
        fix = 0;

        if (row - 14 + column > 1) {
            for (let i = row - 14 + column, j = 14; i < 15; i++, j--) {
                if (buttonCheck[i][j] === player) {
                    fix += buttonCheck[i][j];
                    if (fix >= 5 || fix <= -5) {
                        judge(fix);
                        return;
                    }
                } else {
                    fix = 0;
                }
            }
        } else {
            for (let i = 0, j = row + column; j > 0; i++, j--) {
                if (buttonCheck[i][j] === player) {
                    fix += buttonCheck[i][j];
                    if (fix >= 5 || fix <= -5) {
                        judge(fix);
                        return;
                    }
                } else {
                    fix = 0;
                }
            }
        }
        player = player === 1 ? -1 : 1;
    }
})();