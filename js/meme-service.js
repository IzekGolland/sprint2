'use strict'
const KEY = 'meme';
var gMeme = {};
var gSavedMems = [];

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
        y:50,
        isDragging: false}
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
        y:yPos,
        isDragging: false
    }
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function deleteLine(){
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

function setCurrMeme(currMeme){
    gMeme = currMeme;
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

function SaveMeme(){
    gSavedMems = loadFromStorage(KEY);
    if (!gSavedMems){
        gSavedMems = [];
    }
    gSavedMems.push(gMeme);
    saveToStorage(KEY,gSavedMems);
}

function loadMeme(){
    gSavedMems = loadFromStorage(KEY);
    return gSavedMems;
}