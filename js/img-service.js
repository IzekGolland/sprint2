'use strict'

var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['happy','prsident']},
             {id: 2, url: 'img/2.jpg', keywords: ['happy','animal']},
             {id: 3, url: 'img/3.jpg', keywords: ['happy','animal','kids']},
             {id: 4, url: 'img/4.jpg', keywords: ['happy','animal']},
             {id: 5, url: 'img/5.jpg', keywords: ['happy','kids']},
             {id: 6, url: 'img/6.jpg', keywords: ['happy','movie']},
             {id: 7, url: 'img/7.jpg', keywords: ['happy']},
             {id: 8, url: 'img/8.jpg', keywords: ['happy','movie']},
             {id: 9, url: 'img/9.jpg', keywords: ['happy','kids']},
             {id: 10, url: 'img/10.jpg', keywords: ['happy','prsident']},
             {id: 11, url: 'img/11.jpg', keywords: ['happy','movie']},
             {id: 12, url: 'img/12.jpg', keywords: ['happy','tv']},
             {id: 13, url: 'img/13.jpg', keywords: ['happy','movie']},
             {id: 14, url: 'img/14.jpg', keywords: ['happy','movie']},
             {id: 15, url: 'img/15.jpg', keywords: ['happy','movie']},
             {id: 16, url: 'img/16.jpg', keywords: ['happy','movie']},
             {id: 17, url: 'img/17.jpg', keywords: ['happy','prsident']},
             {id: 18, url: 'img/18.jpg', keywords: ['happy','movie']}];

function createSearchList(){
    var word = gImgs.map(function(img) {
        return img.keywords;
    }).join(',');
    var words = word.split(',');

    var uniqueWords = words.filter(function(word, pos) {
        return words.indexOf(word) == pos;
    })
    return uniqueWords;
}

function getImages(text = ''){
    if (text === ''){
        return gImgs;
    }else{
        //debugger;
        var filterImgs = gImgs.filter(function(img) {
            var isExist = false;
            for (var i=0;i<img.keywords.length;i++){
                 if (img.keywords[i].includes(text)){
                     isExist = true;
                 } 
            }
            return isExist; 
            });
        return filterImgs;
    }

}

function getImageSrc(imageId){
    var image = gImgs.find(function (image) {
        return +imageId === image.id;
    })
    return image.url;
}