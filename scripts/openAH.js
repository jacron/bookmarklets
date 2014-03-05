(function(){
  /*
   * Author: Jan Croonen 2013.
   */

  function isDownloadLink(f, svr) {
      return f.indexOf(svr) !== -1;
  }
  
  function dl(href, handle) {
    window.open(href, handle, 'width=400,height=400');
  }
  var link,
      links = document.links,
      linksLen = links.length,
      i,
      href,
      fp_srv = 'http://filepost.com/files';

  console.log(linksLen);
  
  for (i = 0; i < linksLen; i++) {
    link = links[i];
    href = link.href;
    if (isDownloadLink(href, 'filepost.com')) {
        //console.log(href);
        //window.open(href, 'fp', 'width=40,height=40');
        setTimeout(function() {
            dl(href, 'fp');
        }, 500);
        // testing . . .
        //if (i==2) break;
        //break;
    }
  }
}());
