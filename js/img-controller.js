'use strict'

function onGalleryInit(){
    renderImageGallery();
}

function renderImageGallery() {
    var images = getImages();
    var strHtml = images.map(function (image) {
        return `
        <img class="card-img" onclick="onImageClick('${image.id}')" src="${image.url}">`
    }).join('');
    debugger;
    document.querySelector('.grid-container').innerHTML = strHtml;
}

function onImageClick(imageId){
    var element = document.getElementById("image-gallery");
    element.classList.add("hide");
    element.classList.remove("show");
    var element = document.getElementById("meme-edit");
    element.classList.add("show");
    element.classList.remove("hide");
    initMemeEditor(imageId);
}

