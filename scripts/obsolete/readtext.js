/*
 * Author: jan
 * Date: 15-mei-2014
 * http://jslint.com
 */
'use strict';

(function(){
    var Settings = {
        app: {
            name: 'ReadText',
            version: '1.8'
        },
        readhost: 'http://read.text', // op neptunus port toevoegen:85
        ids: {
            alert: 'rt-message',
            closer: 'rt-button',
            container: 'rt-container',
            header: 'rt-header',
            style: 'rt-style'
        },
        styles: {
            container: 'padding: 30px 90px; ' +
                'font-family: chaparral-regular, chaparral-pro, serif !important;' +
                'max-height: 900px; overflow-y: auto; overflow-x: hidden;',
            alert: 'position:fixed; top:12px;' +
                'color:#222; background-color: rgba(250,250,240,0.99); ' +
                'padding:0; z-index:999; width: 720px;' +
                'font-size:19px; line-height: 1.7;' +
                'margin: 0 10%; ' +
                'border: 1px solid #ccc; box-shadow: 0 6px 12px rgba(0,0,0,0.175);',
            closeButton:
                    'text-align: right;font-weight: bold; font-size: 20px;' +
                    'cursor: default; position: absolute; right: 12px;' +
                    'color: #bbb;',
            header: 'width: 100%; ' +
                    'padding: 3px 0 10px 12px;' +
                    'float:left; color:#999;',
            hide: 'display: none',

            styleTag: '@font-face { font-family:chaparral-regular;' +
            "src:url(" + this.readhost + "/fonts/ChaparralPro-Regular.otf') format('opentype')}" +
            '#rt-button:hover{color:red !important;}'
        }
    };

    function displayText(text) {
        var box = document.getElementById(Settings.ids.alert),
            header = document.getElementById(Settings.ids.header),
            container = document.getElementById(Settings.ids.container),
            styleTag = document.getElementById(Settings.ids.style);

        if (!box) {
            box = divAlert();
            window.document.body.appendChild(box);
        }
        else {
            // Show the box, replace the text and that's it.
            box.setAttribute('style', Settings.styles.alert);
            //container.textContent = text;
            container.innerHTML = text;
            return;
        }
        if (!header) {
            header = divHeader(box);
        }
        if (!container) {
            container = divContainer();
        }
        if (!styleTag) {
            styleTag = getStyleTag();
        }

        box.appendChild(header);
        container.textContent = text;
        box.appendChild(container);
        window.document.body.appendChild(box);
        window.document.body.appendChild(styleTag);
    }

    function getStyleTag() {
        var tag = document.createElement('style');

        tag.id = Settings.ids.style;
        tag.setAttribute('type', 'text/css');
        tag.textContent = Settings.styles.styleTag;
        return tag;
    }

    function divAlert() {
        var div = document.createElement('div');

        div.id = Settings.ids.alert;
        div.setAttribute('style', Settings.styles.alert);
        return div;
    }

    function divContainer() {
        var div = document.createElement('div');

        div.id = Settings.ids.container;
        div.setAttribute('style', Settings.styles.container);
        return div;
    }

    function divHeader(box) {
        var div = document.createElement('div'),
            closer = document.createElement('div'),
            header = document.createElement('div');

        closer.innerHTML = 'x';
        closer.setAttribute('style', Settings.styles.closeButton);
        closer.id = Settings.ids.closer;
        closer.addEventListener('click', function() {
            box.setAttribute('style', Settings.styles.hide);
        });

        header.setAttribute('style', Settings.styles.header);
        header.id = Settings.ids.header;
        header.innerHTML = Settings.app.name + ' v. ' + Settings.app.version;

        div.appendChild(header);
        div.appendChild(closer);
        return div;
    }

    function displayReadWriteCom() {
        var container = null,
            sections = document.getElementsByTagName('section'),
            i;

        for (i = 0; i < sections.length; i += 1) {
            if (sections[i].getAttribute('itemprop') === 'articleBody') {
                container = sections[i];
            }
        }
        if (container) {
            displayText(container.innerHTML);
        }
    }

    /*
     * Start here
     */
    var  href = document.location.href,
         host = location.host,
         link = encodeURIComponent(href),
         sel = getSelection(),
         text = sel.toString();

    if (text.length) {
        // Op deze pagina is tekst geselecteerd
        displayText(text);
    }
    else {
        if (host === 'readwrite.com') {
            displayReadWriteCom(); // NB dit werkt niet (meer)!
        }
        else {
            //console.log('readhost', Settings.readhost);
            document.location.href = Settings.readhost + '/?link=' + link;
        }
    }

}());
