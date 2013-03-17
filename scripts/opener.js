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
   * If the list is anything else, links with images will be apended after
   * the original list. Note: addChild really moves a node, if it already exists.
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
    hasUl = false,
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
    },
    count,
    parent,
    sibling,
    div;

  // If there is an ul, transform it to display horizontally.
  ul = document.getElementsByTagName('ul');
  if (ul.length > 0) {
    hasUl = true;
    ul[0].style.listStyle = 'none';
    li = document.getElementsByTagName('li');
    li_len = li.length;
    for(i = 0; i < li_len; i++){
      li[i].style.display = 'inline';
    }
  }

  // remove pictures (icons)
  /*
  images = document.images;
  for (m=0; m < images.length; m++) {
    im = images[m];
    im.parentNode.removeChild(im);
  }*/

  if (!hasUl) {
    div = document.createElement('div');
    document.body.appendChild(div);
  }
  setTimeout(function (){

  }, 0);
  count = 1;

  // Insert an img in every link to a graphical file.
  for (i = 0; i < bm_len; i++){
    bm_link = bm_links[i];
    href = bm_link.href;

    if (href.indexOf('http') == 0 && hasGraphExtension(href)) {

        img = document.createElement('img');
        img.src = href;
        img.width = '300';
        img.style.height = 'auto';
        img.style.border = 'none';

        // The ul has been transformed, so it is allright to just
        // insert images into each link
        if (hasUl) {
          bm_link.appendChild(img);
          oldtext = img.previousSibling;

          // Remove the original text of the link.
          bm_link.removeChild(oldtext);
        }

        if (!hasUl) {

          parent = bm_link.parentNode;
          sibling = bm_link.nextSibling;
          if (sibling && sibling.nodeType === 3) {// text node
            parent.removeChild(bm_link.nextSibling);
          }

          // There is no UL
          img.style.margin = "10px";
          bm_link.appendChild(img);
          if (count % 3 ==0) {
            bm_link.appendChild(document.createElement('br'));
          }
          oldtext = img.previousSibling;

          // Remove the original text of the link.
          bm_link.removeChild(oldtext);

          //document.body.appendChild(bm_link);

          count++;
        }

        bm_link.target = '_blank';
    }
  }
  console.log('added: ' + count);

}());
