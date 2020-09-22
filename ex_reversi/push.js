'use strict';

(() => {
    const row = 8;
    const column = 8;
    const PLAYER = {none: 0, black: 1, white: 2};
    const findSet = [
        [1, 0], [-1, 0], [0, 1],
        [0, -1], [-1, -1], [1, -1],
        [-1, 1], [1, 1]
    ];

    let check;
    let buttons = [];
    let player;
    let put;

    function setButton() {
        const getGame = document.getElementById('game');
        check.forEach((cols, i) => {
            buttons.push([]);
            cols.forEach((_, j) => {
                const newButton = document.createElement('button');
                newButton.addEventListener('click', () => tapBoard(i, j));
                getGame.appendChild(newButton);
                buttons[i].push(newButton);
                buttons[i][j].style.background = 'green';
            });
            const newBr = document.createElement('br');
            getGame.appendChild(newBr);
        });
        buttons[3][3].style.background = 'white';
        buttons[4][4].style.background = 'white';
        buttons[3][4].style.background = 'black';
        buttons[4][3].style.background = 'black';
    }

    function initData() {
        check = [...Array(row)].map(() => Array(column).fill(PLAYER.none));
        check[3][3] = PLAYER.white;
        check[4][4] = PLAYER.white;
        check[3][4] = PLAYER.black;
        check[4][3] = PLAYER.black;
        player = PLAYER.black;
    }

    function tapBoard(tapRow, tapColumn) {
        put = false;
        if (check[tapRow][tapColumn] === 0) {
            findSet.forEach(moveCell => {
                if (tapRow + moveCell[0] >= 0 && tapRow + moveCell[0] < row && tapColumn + moveCell[1] >= 0 && tapColumn + moveCell[1] < column) {
                if (player != check[tapRow + moveCell[0]][tapColumn + moveCell[1]]) {
                    if (checkBoard(tapRow + moveCell[0], tapColumn + moveCell[1], moveCell)) {
                        put = true;
                    }
                }
            }
            });
        }
        if (put) {
            colorSet(tapRow, tapColumn);
            player = player === PLAYER.black ? PLAYER.white : PLAYER.black;
            judge();
        }
    }

    function checkBoard(checkRow, checkColumn, moveCell) {
        if (checkRow >= 0 && checkRow < row && checkColumn >= 0 && checkColumn < column) {
            if (check[checkRow][checkColumn] === PLAYER.none) {
                return false;
            }
            if (check[checkRow][checkColumn] === player) {
                return true;
            } 
            if (checkBoard(checkRow + moveCell[0], checkColumn + moveCell[1], moveCell)) {
                colorSet(checkRow, checkColumn);
                return true;
            }
        }
        return false;
    }

    function judge() {
        const black = check.flat().filter(c => c == PLAYER.black).length;
        const white = check.flat().filter(c => c == PLAYER.white).length;
        if (!check.flat(Infinity).includes(0)) {
            if (black > white || !check.flat(Infinity).includes(2)) {
                result.textContent = '黒の勝ち';
            } else if (white < black || !check.flat(Infinity).includes(1)) {
                result.textContent = '白の勝ち';
            } else {
                result.textContent = '引き分け';
            }
        }
    }
    function colorSet(row, column) {
        check[row][column] = player;
        if (player === PLAYER.black) {
            buttons[row][column].style.background = 'black';
        } else if (player === PLAYER.white) {
            buttons[row][column].style.background = 'white';
        }
    }

    initData();
    setButton();

})();