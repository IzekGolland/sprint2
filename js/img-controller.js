'use strict'

function onGalleryInit(){
    renderImageGallery();
    renderSearchGallery();
}

function onSearchChange(text){
    renderImageGallery(text);
}

function renderSearchGallery(){
    var searchWords = createSearchList();
    var strHtml = `<input list="words" class="words" name="word" id="word" oninput="onSearchChange(this.value)">
    <datalist id="words">`;
    strHtml += searchWords.map(function (word) {
        return `<option value="${word}">`;
    }).join('');
    strHtml += `</datalist>`
    document.querySelector('.search-words').innerHTML = strHtml;

    strHtml = searchWords.map(function (word,index) {
        return `<p class="item-search" onclick="onWordClick('${word}')">${word}</p>`;
    }).join('');
    document.querySelector('.search-grid').innerHTML = strHtml;
}

function onWordClick(word){
    renderImageGallery(word);
}

function renderImageGallery(text = '') {
    var images = getImages(text);
    var strHtml = images.map(function (image) {
        return `
        <img class="card-img" onclick="onImageClick('${image.id}')" src="${image.url}">`
    }).join('');
    document.querySelector('.grid-container').innerHTML = strHtml;
}

function onImageClick(imageId){
    var element = document.getElementById("image-gallery");
    element.classList.add("hide");
    element.classList.remove("show");
    var element = document.getElementById("main-search");
    element.classList.add("hide");
    element.classList.remove("show");
    var element = document.getElementById("meme-edit");
    element.classList.add("show");
    element.classList.remove("hide");
    initMemeEditor(imageId);
}

