'use strict'

var gElCanvas = [];
var gCtx = [];
var gCurrMeme;
var gStartPos;
var gMemes;
var gImg = null;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function initMemeEditor(imageId){
    gCurrMeme = createMeme(imageId);
    renderCanvas();
    resizeCanvas();
}

function renderCanvas(){
    gElCanvas[0] = document.getElementById('meme-canvas')
    addListeners()
    gCtx[0] = gElCanvas[0].getContext('2d')
    if (!gImg){
        gCurrMeme = getMeme();
        var imageId = getMemeSelectedId();
    } else {
        imageId = null;
    }
    drawImg(imageId,0,false);
}

function renderMemesCanvas(memes){
    gImg = null;
    memes.map(function (meme,index) {
        gElCanvas[index] = document.getElementById('save-canvas' + index)
        gCtx[index] = gElCanvas[index].getContext('2d')
        gCurrMeme = meme;
        setCurrMeme(meme);
        var imageId = getMemeSelectedId();
        drawImg(imageId,index,true);
        if (index<memes.length-1){
            gElCanvas.push('');
            gCtx.push('');
        }
    });
}

function drawImg(imageId,index = 0,saveMemes = false) {
    if (!gImg){
        var img = new Image()
        img.src = getImageSrc(imageId);
        img.onload = () => {
            gImg = img;
            
            console.log(gElCanvas[index].width);
            console.log(gElCanvas[index].height);

            gCtx[index].drawImage(gImg, 0, 0, gElCanvas[index].width, gElCanvas[index].height)
            drawText(index,saveMemes);
            if (!saveMemes) drawFocus(index,saveMemes);
        }
    }else{
        gCtx[index].drawImage(gImg, 0, 0, gElCanvas[index].width, gElCanvas[index].height)        
        drawText(index,saveMemes);
        if (!saveMemes) drawFocus(index,saveMemes);
    }


}

function drawText(index = 0, saveMemes = false) {
    if (!saveMemes){
        var lines = getLines();        
    }else{
        lines = gMemes[index].lines;
        gCurrMeme=gMemes[index];
    }
    for (var i = 0; i<lines.length; i++){
        gCtx[index].lineWidth = 2
        gCtx[index].strokeStyle = 'black'
        gCtx[index].fillStyle = gCurrMeme.lines[i].color;
        gCtx[index].font = gCurrMeme.lines[i].size + 'px IMPACT';
        gCtx[index].textAlign = gCurrMeme.lines[i].align;
        gCtx[index].fillText(gCurrMeme.lines[i].txt, gCurrMeme.lines[i].x, gCurrMeme.lines[i].y)
        gCtx[index].strokeText(gCurrMeme.lines[i].txt, gCurrMeme.lines[i].x, gCurrMeme.lines[i].y)
    }
}

function drawFocus(index = 0){
    var lineFocus = getMemeLineSelected();
    gCtx[index].beginPath()

    var txtWidth = gCtx[index].measureText(gCurrMeme.lines[lineFocus].txt).width;
    gCtx[index].rect(gCurrMeme.lines[lineFocus].x - txtWidth/2 - 5, gCurrMeme.lines[lineFocus].y - gCurrMeme.lines[lineFocus].size + 5, txtWidth + 10, gCurrMeme.lines[lineFocus].size)
    gCtx[index].fillStyle = 'rgba(255, 255, 255, 0)'
    gCtx[index].fillRect(gCurrMeme.lines[lineFocus].x - txtWidth/2 - 5, gCurrMeme.lines[lineFocus].y - gCurrMeme.lines[lineFocus].size + 5, txtWidth + 10, gCurrMeme.lines[lineFocus].size)
    gCtx[index].strokeStyle = 'black'
    gCtx[index].stroke()
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
    deleteTextEdit();
    renderCanvas();
}

function onAddLine(){
    addLine();
    deleteTextEdit();
    renderCanvas();
}

function onSavedImageClick(index){
    var element = document.getElementById("image-gallery");
    element.classList.add("hide");
    element.classList.remove("show");
    var element = document.getElementById("main-search");
    element.classList.add("hide");
    element.classList.remove("show");
    var element = document.getElementById("mems-gallery");
    element.classList.add("hide");
    element.classList.remove("show");
    var element = document.getElementById("meme-edit");
    element.classList.add("show");
    element.classList.remove("hide");
    var meme = gMemes[index];
    setCurrMeme(meme);
    gImg = null;
    renderCanvas();
}

function onDeleteLine(){
    deleteLine();
    deleteTextEdit();
    renderCanvas();
}

function onSaveMeme(){
    SaveMeme();
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

    gMemes = loadFromStorage(KEY);
    if (gMemes){
        var strHtml = gMemes.map(function (meme,index) {
            return `
            <canvas class="save-canvas" id="save-canvas${index}" onclick="onSavedImageClick(${index})" width="500" height="500"></canvas>`
        }).join('');
        document.querySelector('.grid-mems').innerHTML = strHtml;
    
        renderMemesCanvas(gMemes);
    }
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isTextClicked(pos)) return
    gCurrMeme.isDragging = true
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
    deleteTextEdit();
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

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gElCanvas[0].width = elContainer.offsetWidth
    gElCanvas[0].height = elContainer.offsetHeight
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
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

function deleteTextEdit(){
    document.querySelector('.item1').value = '';
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize',doResize,false);
}

function doResize(){
        console.log('Hey');
        resizeCanvas();
        renderCanvas();
}

function addTouchListeners() {
    gElCanvas[0].addEventListener('touchmove', onMove)

    gElCanvas[0].addEventListener('touchstart', onDown)

    gElCanvas[0].addEventListener('touchend', onUp)
}

function addMouseListeners() {
    gElCanvas[0].addEventListener('mousemove', onMove)

    gElCanvas[0].addEventListener('mousedown', onDown)

    gElCanvas[0].addEventListener('mouseup', onUp)
}

function onImgInput(ev) {
    gCurrMeme = getNewMeme();
    loadImageFromInput(ev, renderCanvas)
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()

    reader.onload = function (event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        gImg = img
    }
    reader.readAsDataURL(ev.target.files[0])
}

