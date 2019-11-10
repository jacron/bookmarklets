// ==UserScript==
// @name         openindeximgs
// @namespace    http://tampermonkey.net/
// @version      0.11
// @description  on Index page, immediately load the images
// @author       Jan Croonen
// @match        *://*/*
// @grant        none
// bookmarklets/opener
// ==/UserScript==

(function() {
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
    function bodyAppendBrs(body, n) {
        for (let i = 0; i < n; i+=1) {
            body.appendChild(document.createElement('br'));
        }
    }
    function getAnchor(href, txt) {
        const img = document.createElement('img');
        img.onload = function() {
            this.title = this.naturalWidth + 'x' + this.naturalHeight;
            if (this.naturalWidth > 1000) {
                this.style.border = '1px solid red';
            }
        };
        const isw = '300px';
        img.style.width = isw;
        img.style.height = 'auto';
        img.style.margin = '2px';
        img.src = href;
        const anchor = document.createElement('a');
        // anchor.href = href;
        // anchor.target = '_blank';
        img.onclick = function(e) {
            let w = e.target.style.width;
            e.target.style.width = w == isw ? '' :
                w == '' ? '900px' : isw;
        };
        anchor.appendChild(img);
        const text = document.createTextNode(txt);
        anchor.appendChild(text);
        return anchor;
    }
    function removeElement(element) {
        const parent = element.parentNode;
        if (parent.nodeName === 'LI') {
            parent.parentNode.removeChild(parent);
        } else if (parent.nodeName === 'TD') {
            const tr = parent.parentNode;
            tr.parentNode.removeChild(tr);
        } else {
            let sibling = element.nextSibling;
            if (sibling) {
                sibling.remove();
            }
            element.remove();
        }
    }
    function getAnchors() {
        const links = document.links,
            removable = [],
            anchors = [];
        let pdLink = '';

        for (let i = 0; i < links.length; i+=1) {
            const link = links[i];
            let href = link.href;
            if (link.innerHTML.trim() === 'Parent Directory') {
                pdLink = link;
            }
            else {
                if (hasGraphExtension(href)) {
                    anchors.push(getAnchor(href, i + '/' + links.length + ': ' + link.innerHTML));
                    removable.push(link);
                }
            }
        }
        for (let i = 0; i < removable.length; i += 1) {
            removeElement(removable[i]);
        }
        return {anchors, pdLink};
    }
    function loadImages() {
        const body = document.body;
        body.style.background = '#999';
        const {anchors, pdLink} = getAnchors(body);
        if (!anchors.length) {
            return;
        }
        const anchorsLen = anchors.length;
        const p = document.createElement('p');
        p.appendChild(document.createTextNode(anchorsLen + ' images'));
        const headers = document.getElementsByTagName('h1');
        if (headers.length) {
            body.insertBefore(p, headers[0]);
        }
        bodyAppendBrs(body, 2);
        for (let i = 0; i < anchorsLen; i+=1) {
            body.appendChild(anchors[i]);
        }
        if (pdLink) {
            bodyAppendBrs(body, 2);
            body.appendChild(document.createTextNode(document.title));
            bodyAppendBrs(body, 1);
            body.appendChild(pdLink.cloneNode(true));
            bodyAppendBrs(body, 3);
        }
    }
    if (document.title.indexOf('Index of ') === 0) {
        loadImages();
    }
})();