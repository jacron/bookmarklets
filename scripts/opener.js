(function(){
  /* In a folder without an index-file, servers may deliver
   * a list of the files, with a heading like "Index of...".
   * This bookmarklet will try and insert an image tag for
   * each link to a file that has the extension jpg or png.
   * This image will be included in the link; it will be clickable also.
   *
   * If the list is an ul-tag, then the orientation will be
   * made horizontal instead of vertical.
   * The original text in the link will be removed.
   *
   * Todo: modify the now vertical display of a list in a table.
   *
   * Author: Jan Croonen 2013.
   */
  var bm_links = document.links,
    bm_len = bm_links.length,
    li,
    li_len,
    href,
    bm_link,
    oldtext,
    img,
    ul,
    i,
    hasGraphExtension = function(s) {

      var p,
        ext,
        g = 'jpg;png;gif',
        exts,
        k;

      p = s.lastIndexOf('.');
      if (p != -1) {
        ext = s.substr(p + 1).toUpperCase();
      }
      exts = g.split(';');
      for (k = 0; k < exts.length; k++) {
        if (ext === exts[k].toUpperCase()) {
          return true;
        }
      }
      return false;
    };

  // If there is an ul, transform it to display horizontally.
  ul = document.getElementsByTagName('ul');
  if (ul.length > 0) {
    ul[0].style.listStyle = 'none';
    li = document.getElementsByTagName('li');
    li_len = li.length;
    for(i = 0; i < li_len; i++){
      li[i].style.display = 'inline';
    }
  }

  // Insert an img in every link to a graphical file.
  for (i = 0; i < bm_len; i++){
    bm_link = bm_links[i];
    href = bm_link.href;
    if (href.indexOf('http') == 0 && hasGraphExtension(href)) {

        img = document.createElement('img');
        img.src = href;
        img.width = '300';

        bm_link.appendChild(img);
        oldtext = img.previousSibling;
        bm_link.removeChild(oldtext);

        bm_link.target = '_blank';
    }
  }
}());
