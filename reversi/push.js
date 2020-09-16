'use strict';

(() => {
    const row = 8;
    const column = 8;
    const findSet = [
        [1, 0], [-1, 0], [0, 1],
        [0, -1], [-1, -1], [1, -1],
        [-1, 1], [1, 1]
    ];

    let check = [];
    let buttons = [];
    let player;
    let playerChange = false;

    function setButton() {
        const getGame = document.getElementById('game');
        for (let i = 0; i < row; i++) {
            const setData = [];
            buttons.push([]);
            for (let j = 0; j < column; j++) {
                const newButton = document.createElement('button');
                newButton.style.background = 'green';
                if (i === 3) {
                    if (j === 3) {
                        setData.push(2);
                        newButton.style.background = 'white';
                    } else if (j === 4) {
                        setData.push(1);
                        newButton.style.background = 'black';
                    } else {
                        setData.push(0);
                    }
                } else if (i === 4){
                    if (j === 3) {
                        setData.push(1);
                        newButton.style.background = 'black';
                    } else if (j === 4) {
                        setData.push(2);
                        newButton.style.background = 'white';
                    } else {
                        setData.push(0);
                    }
                } else {
                    setData.push(0);
                }
                newButton.addEventListener('click', () => pushButton(i, j));
                getGame.appendChild(newButton);
                buttons[i].push(newButton);
            }
            const newBr = document.createElement('br');
            getGame.appendChild(newBr);
            check.push(setData);
            player = 1;
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
            player = player === 1 ? 2 : 1;
            playerChange = false;
        }
    }

    function reversi(setRow, setColumn, v, cellReverse) {
        if (cellReverse) {
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
        } else {
            let flag = false;
            for (let r = setRow + v[0], c = setColumn + v[1];
                    r < row && r >= 0 && c < column && c >= 0;
                    r += v[0], c += v[1]) {

                if (check[r][c] === 0) {
                    return;
                } else if (check[r][c] != player) {
                    flag = true;
                }
                if (flag) {
                    if (check[r][c] === player) {
                        reversi(setRow, setColumn, v, flag);
                    }
                }
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
        if (player == 1) {
            buttons[row][column].style.background = 'black';
        } else if (player === 2) {
            buttons[row][column].style.background = 'white';
        }
    }

    function judge() {
        if (!check.flat(Infinity).includes(0)) {
            if (check.flat(Infinity).includes(1) > buttonCheck.flat(Infinity).includes(2) || !buttonCheck.flat(Infinity).includes(2)) {
                result.textContent = '黒の勝ち';
            } else if (check.flat(Infinity).includes(1) < buttonCheck.flat(Infinity).includes(2) || !buttonCheck.flat(Infinity).includes(1)) {
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
                return;
            } else if (check[r][c] != player) {
                flag = true;
            }
            if (flag) {
                if (check[r][c] === player) {
                    return true;
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
                    skip = cellsCheck(i, j, v);
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
        if (skip) {
            alert('置ける場所がありません。スキップします。');
            player = player === 1 ? 2 : 1;
        }
    }

    setButton();
    judge();

})();