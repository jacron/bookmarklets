/*
 * Author: jan
 * Date: 1-mrt-2014
 */
var  href = document.location.href,
     link = encodeURIComponent(href);

    window.open('http://downloader.local/#/lees?link=' + link, 'w', '_blank');

