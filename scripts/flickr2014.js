/*
 * Author: jan
 * Date: 31-mei-2014
 */
(function() {
    /*
    var p = document.getElementsByClassName('photo-well-media-view');
    console.log(p);
    var img = p[0].getElementsByTagName('img');
    console.log(img);*/
    /*
    var mainImg = document.getElementsByClassName('main-photo');
    var src = mainImg[0].getAttribute('src');*/
    var main = document.getElementById('allsizes-photo'),
        img = main.getElementsByTagName('img'),
        src = img[0].getAttribute('src');
/*console.log(main);
console.log(img);
console.log(src);*/
    document.location.href = src;

}());


