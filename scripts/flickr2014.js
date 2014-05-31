/*
 * Author: jan
 * Date: 31-mei-2014
      'script' => "
        p = document.getElementById('allsizes-photo'),
        img = p.getElementsByTagName('img')[0],
        src = img.getAttribute('src');
        src = src.substr(0, src.lastIndexOf('.'((;
        document.location.href = src + '_d.jpg';
      ",
 */
(function() {
    /*
    var p = document.getElementsByClassName('photo-well-media-view');
    console.log(p);
    var img = p[0].getElementsByTagName('img');
    console.log(img);*/
    var mainImg = document.getElementsByClassName('main-photo');
    //console.log(mainImg);
    var src = mainImg[0].getAttribute('src');
    //console.log(src);
    document.location.href = src;

}());


