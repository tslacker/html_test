'use strict';

(() => {
    const row = 8;
    const column = 8;
    const findSet = [
        [1, 0], [-1, 0], [0, 1],
        [0, -1], [-1, -1], [1, -1],
        [-1, 1], [1, 1]
    ];
    const PLAYER = {none: 0, black: 1, white: 2};

    let check;
    let buttons = [];
    let player;
    let playerChange = false;

    function setButton() {
        const getGame = document.getElementById('game');
        check.forEach((cols, i) => {
            buttons.push([]);
            cols.forEach((_, k) => {
                const newButton = document.createElement('button');
                // newButton.addEventListener('click', () => pushButton(i, k));
                newButton.addEventListener('click', () => tapBoard(i, k));
                getGame.appendChild(newButton);
                buttons[i].push(newButton);
                buttons[i][k].style.background = 'green';
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
        findSet.forEach((moveCell) => {
            if (checkBoard(tapRow, tapColumn, moveCell)) {
                console.log(`black = ${check.flat().filter((c) => c == PLAYER.black).length}`);
                console.log(`white = ${check.flat().filter((c) => c == PLAYER.white).length}`);
            }
        });
    }

    function checkBoard(checkRow, checkColumn, moveSel) {
        let cellCheck = false;
        for (let r = checkRow + moveSel[0], c = checkColumn + moveSel[1];
            r < row && r >= 0 && c < column && c >= 0;
            r += moveSel[0], c += moveSel[1]) {
            if (check[r][c] === PLAYER.none) {
                return cellCheck;
            } else if (check[r][c] != player) {
                cellCheck = true;
            } else if (check[r][c] === player) {
                if (cellCheck) {
                    return cellCheck;
                }
            }
        }
    }

    function cellSet(row, column) {
        check[row][column] = player;
    }

    function cellCheck(row, column) {
        for (const v of findSet) {
            reversi(row, column, v, false);
        }
        if(playerChange) {
            player = player === PLAYER.black ? PLAYER.white : PLAYER.black;
            playerChange = false;
        }
    }

    function reversi(setRow, setColumn, v) {
        for (let r = setRow, c = setColumn;
            r < row && r >= 0 && c < column && c >= 0;
            r += v[0], c += v[1]) {

            cellSet(r, c);
            colorSet(r, c);
            playerChange = true;
            if(check[r + v[0]][c + v[1]] === player || check[r + v[0]][c + v[1]] === 0) {
                return;
            }
        }
    }

    function pushButton(row, column) {
        if (check[row][column] === 0) {
            cellCheck(row, column);
        }
        skipCheck();

    }

    function colorSet(row, column) {
        if (player === PLAYER.black) {
            buttons[row][column].style.background = 'black';
        } else if (player === PLAYER.white) {
            buttons[row][column].style.background = 'white';
        }
    }

    function judge() {
        if (!check.flat().includes(PLAYER.none)) {
            if (check.flat().includes(PLAYER.black) > check.flat().includes(PLAYER.white) || !check.flat().includes(PLAYER.white)) {
                result.textContent = '黒の勝ち';
            } else if (check.flat().includes(PLAYER.white) < check.flat().includes(PLAYER.black) || !check.flat().includes(PLAYER.black)) {
                result.textContent = '白の勝ち';
            } else {
                result.textContent = '引き分け';
            }
        }
    }

    function cellsCheck(row, column, v) {
        let flag = false;
        for (let r = row + v[0], c = column + v[1];
            r < row && r >= 0 && c < column && c >= 0;
            r += v[0], c += v[1]) {

            if (check[r][c] === 0) {
                return flag;
            } else if (check[r][c] != player) {
                flag = true;
            }
            if (flag) {
                if (check[r][c] === player) {
                    return flag;
                }
            }
        }
        return false;
    }

    function skipCheck() {
        let skip = false;
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                for (const v of findSet) {
                    if (!skip) {
                        skip = cellsCheck(i, j, v);
                    }
                    console.log(`Skip = ${skip}`);
                    if (skip) {
                        break;
                    }
                }
                if (skip) {
                    break;
                }
            }
            if (skip) {
                break;
            }
        }
        if (!skip) {
            alert('置ける場所がありません。スキップします。');
            player = player === 1 ? 2 : 1;
        }
    }

    initData();
    setButton();

})();