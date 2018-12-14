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

//http://coding.smashingmagazine.com/2010/05/23/make-your-own-bookmarklets-with-jquery/
//use jquery in your bookmarklet
(function(){

	// the minimum version of jQuery we want
	var v = "1.3.2";

	// check prior inclusion and version
	if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
		var done = false;
		var script = document.createElement("script");
		script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				initMyBookmarklet();
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	} else {
		initMyBookmarklet();
	}

	function initMyBookmarklet() {
		(window.myBookmarklet = function() {
			// your JavaScript code goes here!
  //console.log('document ready in jQuery style');
  getImages();
		})();
	}

})();
function hasGraphExt(s) {
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

}
function getImages(){
  console.log('will build my function here...');

}

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
      var W, H;

    if (href.indexOf('http') == 0 && hasGraphExtension(href)) {

        img = document.createElement('img');

        img.onload = function() {
          H = this.height;
          W = this.width;

          var titleText = W + 'x' + H;// + '\n' + href;
          this.title = titleText;

          this.width = '300';
          this.style.height = 'auto';
          this.style.border = 'none';
          /*
          var txt = document.createTextNode(sizeText);
          var parent = this.parentNode;
          parent.appendChild(txt);*/
        }
        img.src = href;

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
        //img.title = W + 'x' + H + '\n' + oldtext;
        //console.log(oldtext);
    }
  }
  console.log('script2 added: ' + count);

}());
