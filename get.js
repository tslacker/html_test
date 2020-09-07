'use strict';

function getRandomInt() {
    const result = document.getElementById('result');
    const results = ['大吉', '大凶', '凶', '吉', '中吉'];
    const fix = Math.floor(Math.random() * results.length);
    const comment = results[fix];

    result.textContent = `${comment}です。`;
}

// function getRandomInt(max) {
//     const result = document.getElementById('result');
//     const fix = Math.floor(Math.random() * max);
//     let comment;

//     if (fix === 1) {
//         comment = '大凶';
//     } else if (fix === 2) {
//         comment = '凶';
//     } else if (fix === 3) {
//         comment = '吉';
//     } else if (fix === 4) {
//         comment = '中吉';
//     } else {
//         comment = '大吉';
//     }
    
//     result.textContent = comment + 'です。';
// }
