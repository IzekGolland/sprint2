'use strict'
const KEY = 'meme';
//var gMemes = [];
var gMeme = {};

function createMeme(imgId){
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
        {txt: 'Enter Text Here',
        size: 50,
        align: 'center',
        color: 'blue',
        x: 250,
        y:50}
        ]
    };
    return gMeme;
}

function addLine(){
    var yPos;
    if (!gMeme.lines.length){
        yPos = 50;
    } else if (gMeme.lines.length === 1){
        yPos = 450;
    } else{
        yPos = 250;
    }
    var line = {
        txt: 'Enter Text Here',
        size: 50,
        align: 'center',
        color: 'blue',
        x: 250,
        y:yPos
    }
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function deleteLine(){
    //debugger;
    gMeme.lines.splice(gMeme.selectedLineIdx,1);
    if (gMeme.selectedLineIdx>0){
        gMeme.selectedLineIdx--;
    } 
}

function getMeme(){
    return gMeme;
}

function getLines(){
    return gMeme.lines;
}

function changeFontSize(diff){
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function changeTextPos(diff){
    gMeme.lines[gMeme.selectedLineIdx].y -= diff;
}

function getMemeSelectedId(){
    return gMeme.selectedImgId;
}

function changeFocus(){
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1){
        gMeme.selectedLineIdx = 0;
    }else{
        gMeme.selectedLineIdx++;
    }
}

function getMemeLineSelected(){
    return gMeme.selectedLineIdx;
}

function updateMeme(memeText){
    gMeme.lines[gMeme.selectedLineIdx].txt = memeText;    
}