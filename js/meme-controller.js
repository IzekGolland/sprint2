'use strict'

var gElCanvas;
var gCtx;
var gCurrMeme;

function initMemeEditor(imageId){
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    gCurrMeme = createMeme(imageId);
    renderCanvas();
}

function renderCanvas(){
    gCurrMeme = getMeme();
    var imageId = getMemeSelectedId();
    drawImg(imageId);
}

function drawImg(imageId) {
    const img = new Image()
    img.src = getImageSrc(imageId);
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText();
        drawFocus();
    }
}

function drawText() {
    var lines = getLines();
    for (var i = 0; i<lines.length; i++){
        gCtx.lineWidth = 2
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = gCurrMeme.lines[i].color;
        gCtx.font = gCurrMeme.lines[i].size + 'px IMPACT';
        gCtx.textAlign = gCurrMeme.lines[i].align;
        gCtx.fillText(gCurrMeme.lines[i].txt, gCurrMeme.lines[i].x, gCurrMeme.lines[i].y)
        gCtx.strokeText(gCurrMeme.lines[i].txt, gCurrMeme.lines[i].x, gCurrMeme.lines[i].y)
    }
}

function drawFocus(){
    var lineFocus = getMemeLineSelected();
    gCtx.beginPath()
    gCtx.rect(10, gCurrMeme.lines[lineFocus].y - gCurrMeme.lines[lineFocus].size + 5, (gElCanvas.width - 10), gCurrMeme.lines[lineFocus].size)
    gCtx.fillStyle = 'rgba(255, 255, 255, 0)'
    gCtx.fillRect(10, gCurrMeme.lines[lineFocus].y - gCurrMeme.lines[lineFocus].size + 5, (gElCanvas.width - 10), gCurrMeme.lines[lineFocus].size)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()

//    gCtx.lineWidth = 6
}

function onInputChange(memeText){
    updateMeme(memeText);
    renderCanvas();
}

function onChangeFontSize(diff){
    changeFontSize(diff);
    renderCanvas();
}

function onChangeTextPos(diff){
    changeTextPos(diff);
    renderCanvas();
}

function onChangeFocus(){
    changeFocus();
    renderCanvas();
}

function onAddLine(){
    addLine();
    renderCanvas();
}

function onDeleteLine(){
    deleteLine();
    renderCanvas();
}