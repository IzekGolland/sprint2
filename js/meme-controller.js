'use strict'

var gElCanvas;
var gCtx;
var gCurrMeme;
var gStartPos;

function initMemeEditor(imageId){
    gCurrMeme = createMeme(imageId);
    renderCanvas();
}

function renderCanvas(){
    gElCanvas = document.getElementById('meme-canvas')
    addMouseListeners()
    gCtx = gElCanvas.getContext('2d')
    gCurrMeme = getMeme();
    var imageId = getMemeSelectedId();
    drawImg(imageId);
}

function renderMemesCanvas(memes){
    memes.map(function (meme,index) {
        gElCanvas = document.getElementById('save-canvas' + index)
        gCtx = gElCanvas.getContext('2d')
        gCurrMeme = meme;
        setCurrMeme(gCurrMeme);
        var imageId = getMemeSelectedId();
        drawImg(imageId);
    });
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

function onMemesClick(){
    var element = document.getElementById("main-search");
    element.classList.add("hide");
    element.classList.remove("show");   
    var element = document.getElementById("image-gallery");
    element.classList.add("hide");
    element.classList.remove("show");   
    var element = document.getElementById("meme-edit");
    element.classList.add("hide");
    element.classList.remove("show");   
    var element = document.getElementById("mems-gallery");
    element.classList.add("show");
    element.classList.remove("hide");   

    var memes = loadFromStorage(KEY);
    if (memes){
        var strHtml = memes.map(function (meme,index) {
            return `
            <canvas id="save-canvas${index}" height="500" width="500" onclick="draw(event,'${meme.id}','${meme.url}')" ></canvas>`
        }).join('');
        document.querySelector('.grid-mems').innerHTML = strHtml;
    
        renderMemesCanvas(memes);
    }
}

function onDeleteLine(){
    deleteLine();
    renderCanvas();
}

function onSaveMeme(){
    SaveMeme();
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)

    gElCanvas.addEventListener('mousedown', onDown)

    gElCanvas.addEventListener('mouseup', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isTextClicked(pos)) return
    gCurrMeme.isDragging = true
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    if (gCurrMeme.isDragging) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y

        gCurrMeme.lines[gCurrMeme.selectedLineIdx].x += dx
        gCurrMeme.lines[gCurrMeme.selectedLineIdx].y += dy

        gStartPos = pos
        renderCanvas()
    }
}

function onUp() {
    gCurrMeme.isDragging = false
    document.body.style.cursor = 'default'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    return pos
}



function isTextClicked(clickedPos) {
    for (var i=0;i<gCurrMeme.lines.length;i++){
        const x = gCurrMeme.lines[i].x;
        const y = gCurrMeme.lines[i].y;
        const distanceX = x - clickedPos.x;
        const distanceY = y - clickedPos.y;
        if (Math.abs(distanceX) <= gCurrMeme.lines[i].size &&
            Math.abs(distanceY) <= gCurrMeme.lines[i].size){
                gCurrMeme.selectedLineIdx = i;
                setCurrMeme(gCurrMeme);    
                return true;            
        }
    }
    return false;
}
