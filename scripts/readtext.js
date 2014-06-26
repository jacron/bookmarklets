/*
 * Author: jan
 * Date: 15-mei-2014
 */
(function(){
    var Settings = {
        app: {
            name: 'ReadText',
            version: '1.2'
        },
        ids: {
            alert: 'rt-message',
            button: 'rt-button',
            container: 'rt-container',
            header: 'rt-header',
            style: 'rt-style'
        },
        styles: {
            container: 'padding: 24px; ' +
                'font-family: chaparral-regular, chaparral-pro, serif !important;',
            alert: 'position:fixed; top:6px; left:0px; ' +
                'color:#222; background-color: rgba(250,250,240,0.99); ' +
                'padding:0; z-index:99; width: 690px;' +
                'font-size:19px; line-height: 1.7;' +
                'margin: 0 10%; box-shadow: 0 6px 12px rgba(0,0,0,0.175);',
            closeButton:
                    'background:brown;color:yellow; padding: 0 10px 3px;' +
                    'text-align: right;font-weight: bold; font-size: 20px;' +
                    'cursor: default; opacity: 0.6;',
            header: 'float:left',
            hide: 'display: none'
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
            // Show the box and that's it.
            box.setAttribute('style', Settings.styles.alert);
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
        tag.textContent = '@font-face { font-family:chaparral-regular;' +
            "src:url('http://read.text:85/fonts/ChaparralPro-Regular.otf') format('opentype')}" +
            '#rt-button:hover{color:red;}';
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
        div.setAttribute('style', Settings.styles.closeButton);
        closer.id = Settings.ids.button;
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

    var  href = document.location.href,
         link = encodeURIComponent(href),
         sel = getSelection(),
         text = sel.toString();

    if (text.length) {
        displayText(text);
    }
    else {
        document.location.href = 'http://read.text:85/?link=' + link;
    }

}());
