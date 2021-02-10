'use strict'

var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['happy']},
             {id: 2, url: 'img/2.jpg', keywords: ['happy']},
             {id: 3, url: 'img/3.jpg', keywords: ['happy']},
             {id: 4, url: 'img/4.jpg', keywords: ['happy']},
             {id: 5, url: 'img/5.jpg', keywords: ['happy']},
             {id: 6, url: 'img/6.jpg', keywords: ['happy']},
             {id: 7, url: 'img/7.jpg', keywords: ['happy']},
             {id: 8, url: 'img/8.jpg', keywords: ['happy']},
             {id: 9, url: 'img/9.jpg', keywords: ['happy']},
             {id: 10, url: 'img/10.jpg', keywords: ['happy']}];

function getImages(){
    return gImgs;
}

function getImageSrc(imageId){
    var image = gImgs.find(function (image) {
        return +imageId === image.id;
    })
    return image.url;
}