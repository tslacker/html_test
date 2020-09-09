'use strict';

const twentyFive = 25;
let buttonCheck = [];
for(let i=0; i < 25; i++) {
    buttonCheck.push(Math.floor(Math.random() * 2));
    let j = '"'+i+'"';
        if (buttonCheck[i] === 1) {
            document.getElementById(i).style.background = 'red';
        } else {
            document.getElementById(i).style.background = `blue`;
        }
}

function pushButton(buttonNo) {
    let intNo = parseInt(buttonNo);

    if (buttonCheck[intNo] === 1) {
        buttonCheck[intNo] = 0;
        document.getElementById(intNo).style.background = `blue`;
    } else {
        buttonCheck[intNo] = 1;
        document.getElementById(intNo).style.background = 'red';
    }

    if (intNo > 4 ) {
        if (buttonCheck[intNo - 5] === 1) {
            buttonCheck[intNo - 5] = 0;
            document.getElementById(intNo - 5).style.background = `blue`;
        } else {
            buttonCheck[intNo - 5] = 1;
            document.getElementById(intNo - 5).style.background = 'red';
        }
    }
    if (intNo < 20 ) {
        if (buttonCheck[intNo + 5] === 1) {
            buttonCheck[intNo + 5] = 0;
            document.getElementById(intNo + 5).style.background = `blue`;
        } else {
            buttonCheck[intNo + 5] = 1;
            document.getElementById(intNo + 5).style.background = 'red';
        }
    }
    if (intNo % 5 !== 0 ) {
        if (buttonCheck[intNo - 1] === 1) {
            buttonCheck[intNo - 1] = 0;
            document.getElementById(intNo-1).style.background = `blue`;
        } else {
            buttonCheck[intNo - 1] = 1;
            document.getElementById(intNo - 1).style.background = 'red';
        }
    }
    if (intNo % 5 !== 4 ) {
        if (buttonCheck[intNo + 1] === 1) {
            buttonCheck[intNo + 1] = 0;
            document.getElementById(intNo + 1).style.background = `blue`;
        } else {
            buttonCheck[intNo + 1] = 1;
            document.getElementById(intNo + 1).style.background = 'red';
        }
    }
}