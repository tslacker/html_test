'use strict';

let buttonCheck = [];

// for (let i = 0; i < 25; i++) {
//     const newButton = document.createElement('button');
//     newButton.style.background = 'yellow';
//     const getGame = document.getElementById('game');
//     getGame.appendChild(newButton);
//     if (i % 5 === 4) {
//         const newBr = document.createElement('br');
//         getGame.appendChild(newBr);
//     }
//     buttonCheck[i] = true;
//     document.getElementById(i).style.background = 'blue';
// }

let buttonCheck = [];
for (let i=0; i < 1000; i++) {
    pushButton(Math.floor(Math.random() * 25));
}

function pushButton(buttonNo) {
    const intNo = parseInt(buttonNo, 10);
    
    if (buttonCheck[intNo] === 1) {
        buttonCheck[intNo] = 0;
        document.getElementById(intNo).style.background = 'blue';
    } else {
        buttonCheck[intNo] = 1;
        document.getElementById(intNo).style.background = 'red';
    }

    if (intNo > 4) {
        if (buttonCheck[intNo - 5] === 1) {
            buttonCheck[intNo - 5] = 0;
            document.getElementById(intNo - 5).style.background = 'blue';
        } else {
            buttonCheck[intNo - 5] = 1;
            document.getElementById(intNo - 5).style.background = 'red';
        }
    }
    if (intNo < 20) {
        if (buttonCheck[intNo + 5] === 1) {
            buttonCheck[intNo + 5] = 0;
            document.getElementById(intNo + 5).style.background = 'blue';
        } else {
            buttonCheck[intNo + 5] = 1;
            document.getElementById(intNo + 5).style.background = 'red';
        }
    }
    if (intNo % 5 !== 0) {
        if (buttonCheck[intNo - 1] === 1) {
            buttonCheck[intNo - 1] = 0;
            document.getElementById(intNo - 1).style.background = 'blue';
        } else {
            buttonCheck[intNo - 1] = 1;
            document.getElementById(intNo - 1).style.background = 'red';
        }
    }
    if (intNo % 5 !== 4) {
        if (buttonCheck[intNo + 1] === 1) {
            buttonCheck[intNo + 1] = 0;
            document.getElementById(intNo + 1).style.background = 'blue';
        } else {
            buttonCheck[intNo + 1] = 1;
            document.getElementById(intNo + 1).style.background = 'red';
        }
    }

    let fix = 0;
    for (let i = 0; i < 25; i++) {
        fix += buttonCheck[i];
    }

    function colorChange(position) {
        buttonCheck[position] = !(buttonCheck[position]);
        if (buttonCheck[position] === true) {
            document.getElementById(position).style.background = 'blue';
        } else {
            document.getElementById(position).style.background = 'red';
        }
    }
    
    // function pushButton(buttonNo) {
    //     const intNo = parseInt(buttonNo, 10);
        
    //     colorChange(intNo);
    
    //     if (intNo > 4) {
    //         colorChange(intNo - 5);
    //     }
    //     if (intNo < 20) {
    //         colorChange(intNo + 5);
    //     }
    //     if (intNo % 5 !== 0) {
    //         colorChange(intNo - 1);
    //     }
    //     if (intNo % 5 !== 4) {
    //         colorChange(intNo + 1);
    //     }
    
    //     // let fix = 0;
    //     // for (let i = 0; i < 25; i++) {
    //     //     fix += buttonCheck[i] ? 1 : 0;
    //     // }
    
    //     // for (const v of buttonCheck) {
    //     //     fix += v ? 1 : 0;
    //     // }
    
    //     // buttonCheck.forEach(v => fix += v ? 1 : 0);
        
    //     // aに対してa + c の結果がリターンされる。
    //     // console.log(buttonCheck);
    //     const fix = buttonCheck.reduce( (a, c) => {
    //         // console.log(c);
    //         return c ? a + 1 : a;
    //     } , 0);

    if (fix === 0 || fix === 25) {
        result.textContent = 'ゲームクリアー';
    }
}