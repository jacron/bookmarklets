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
     * It will attach an informative tooltip to each image, displaying the size.
     * The existing list of links will be removed.
     *
     * Author: Jan Croonen 2013.
     *
     * 2019
     * tampermonkey
    */
    // @match        *://*/*

    'use strict';

    function hasGraphExtension(s) {
        const p = s.lastIndexOf('.'),
            exts = ['jpg','png', 'gif', 'jpeg', 'bmp'];
        if (p !== -1) {
            const ext = s.substr(p + 1).toLowerCase();
            for (let k = 0; k < exts.length; k+=1) {
                if (ext === exts[k]) {
                    return true;
                }
            }
        }
        return false;

    }
    function bodyAppendElements(body, el, n) {
        for (let i = 0; i < n; i+=1) {
            body.appendChild(document.createElement(el));
        }
    }
    function getAnchor(href) {
        const img = document.createElement('img');
        img.onload = function() {
            this.title = this.naturalWidth + 'x' + this.naturalHeight;
            if (this.naturalWidth > 1000) {
                this.style.border = '1px solid red';
            }
        };
        img.width = 300;
        img.style.height = 'auto';
        img.style.margin = '2px';
        img.src = href;
        const anchor = document.createElement('a');
        anchor.href = href;
        anchor.target = '_blank';
        anchor.appendChild(img);
        return anchor;
    }
    function getAnchors() {

        const links = document.links,
            anchors = [];
        let pdLink = '';

        for (let i = 0; i < links.length; i+=1) {
            const link = links[i];
            let href = link.href;
            if (link.innerHTML.trim() === 'Parent Directory') {
                pdLink = link;
            }
            if ((href.indexOf('http') === 0 || href.indexOf('ftp') === 0) &&
                hasGraphExtension(href) &&
                link.getElementsByTagName('img').length === 0 // skip icons
            ) {
                anchors.push(getAnchor(href));
            }
        }
        return {anchors, pdLink};
    }
    function emptyBody(body) {
        while (body.childNodes.length > 0) {
            const node = body.childNodes[0];
            body.removeChild(node);
        }
    }
    function loadImages() {
        const body = document.body;
        const {anchors, pdLink} = getAnchors(body);
        if (!anchors.length) {
            return;
        }
        // emptyBody(body);
        const anchorsLen = anchors.length;
        const title = document.createElement('h1');
        title.appendChild(document.createTextNode(anchorsLen + ' images for ' + document.title));
        body.appendChild(title);
        if (pdLink) {
            body.appendChild(pdLink);
        }
        bodyAppendElements(body,'br', 2);
        for (let i = 0; i < anchorsLen; i+=1) {
            body.appendChild(anchors[i]);
        }
        if (pdLink) {
            bodyAppendElements(body,'br', 2);
            body.appendChild(pdLink.cloneNode(true));
            bodyAppendElements(body, 'br', 3);
        }
    }
    if (document.title.indexOf('Index of ') === 0) {
        loadImages();
    }
}());
