'use strict';

(() => {
    const cells = 4;

    let check = [];
    let buttons;

    function setButton() {
        const getGame = document.getElementById('game');
        const setData = [];
        const newCanvas = document.createElement('canvas');
              newCanvas.id = 'canvas';
              
        const newVideo = document.createElement('video');
              newVideo.src = "https://s3-ap-northeast-1.amazonaws.com/codeprep-migration/book/html5/video.mp4"
              newVideo.id = 'video';
              newVideo.autoplay = true;
              newVideo.loop = true;
              getGame.appendChild(newVideo);

        if (newCanvas.getContext) {
            const canvasContext = newCanvas.getContext('2d');
            canvasContext.clearRect(0, 0, newCanvas.width, newCanvas.height);
            canvasContext.drawImage(newCanvas, 0, 0);
            getGame.appendChild(newCanvas);
        
        }
    }

    setButton();

})();