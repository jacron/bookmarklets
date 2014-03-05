'use strict';
/*global document */
/*jslint browser:true, white:true, devel:true */
/*
 * http://www.jslint.com/
 * @returns {undefined}
 */
(function() {
    /* In a folder without an index-file, servers may deliver
     * a list of the files, with a heading like "Index of...".
     * This bookmarklet will try and insert an image tag for
     * each link to a file that has the extension jpg or png.
     * Also it will provide a nice header including the link to Parent Directory.
     * It will attach an informative tooltip to each image.
     * The existing list of links will be removed.
     *
     * Author: Jan Croonen 2013.
     */

    function hasGraphExtension(s) {
        var p,
            ext,
            exts = ['jpg','png', 'gif', 'jpeg'],
            k;

        p = s.lastIndexOf('.');
        if (p !== -1) {
            ext = s.substr(p + 1).toUpperCase();
            for (k = 0; k < exts.length; k+=1) {
                if (ext === exts[k].toUpperCase()) {
                    return true;
                }
            }
        }
        return false;

    }
    function unescape(s) {
        return s.replace('&gt;', '>').replace('&lt;', '<');
    }
    function bodyAppendElements(el, n) {
        var i;
        for (i = 0; i < n; i+=1) {
            body.appendChild(document.createElement(el));
        }
    }
    var link,
        links = document.links,
        linksLen = links.length,
        i,
        href,
        img,
        anchor,
        anchors = [],
        anchorsLen,
        body = document.body,
        pdLink,
        title,
        linkText,
        innerImg,
        node;

    for (i = 0; i < linksLen; i+=1) {
        link = links[i];
        href = link.href;
        linkText = link.innerHTML;
        innerImg = link.getElementsByTagName('img');

        if (linkText.trim() === 'Parent Directory') {
            pdLink = link;
        }
        if (href.indexOf('http') === 0 &&
                hasGraphExtension(href) &&
                innerImg.length === 0  // skip icons
                ) {
            img = document.createElement('img');

            img.onload = function() {
                this.title += '\n' + this.naturalWidth + 'x' + this.naturalHeight;
            };
            img.width = '300';
            img.style.height = 'auto';
            img.style.border = 'none';
            img.style.margin = '2px';

            img.src = href;
            img.title = unescape(linkText);

            anchor = document.createElement('a');
            anchor.href = href;
            anchor.target = '_blank';
            anchor.appendChild(img);
            anchors.push(anchor);
        }
    }
    // Remove all elements from body.
    // http://stackoverflow.com/questions/4952585/how-can-i-remove-all-child-elements-of-body-element-with-domdocument
    while (body.childNodes.length > 0) {
        node = body.childNodes[0];
        body.removeChild(node);
    }
    // Provide header.
    anchorsLen = anchors.length;
    title = document.createElement('h1');
    title.appendChild(document.createTextNode(anchorsLen + ' images for ' + document.title));
    body.appendChild(title);
    if (pdLink) {
        body.appendChild(pdLink);
    }
    bodyAppendElements('br', 2);
    for (i = 0; i < anchorsLen; i+=1) {
        body.appendChild(anchors[i]);
    }
    //console.log('open: version=x');
    if (pdLink) {
        bodyAppendElements('br', 2);
        body.appendChild(pdLink.cloneNode(true));
        bodyAppendElements('br', 3);
    }
}());
