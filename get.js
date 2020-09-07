'use strict';
function getRandomInt(max) {
    const object = document.getElementById("object");
    const fix = Math.floor(Math.random() * Math.floor(max));
    let comment;
    if(fix == 1) {
        comment="大凶";
    } else if(fix == 2) {
        comment="凶";
    } else if(fix == 3) {
        comment="吉";
    } else if(fix == 4) {
        comment="中吉";
    } else {
        comment="大吉";
    }
    object.textContent = comment + "です。";
  }