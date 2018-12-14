/*
 * Author: jan
 * Date: 15-mei-2014
 * http://jslint.com
 */
/*global $*/
'use strict';

(function(){
    var Settings = {
        app: {
            name: 'ReadText',
            version: '2.0'
        },
        readhost: 'http://read.text',
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
            container2: 'padding: 30px 60px; ' +
            'font-family: chaparral-regular, chaparral-pro, serif !important;' +
            'font-size:20px;background-color:rgba(250,250,240,0.99);',
            container3: 'padding: 30px 60px;background-color:rgba(250,250,240,0.99);',
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
            "src:url(http://read.text/fonts/ChaparralPro-Regular.otf') format('opentype')}" +
            '#rt-button:hover{color:red !important;}'
        }
    };

    function AjaxRequest(){
        var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"]; //activeX versions to check for in IE
        if (window.ActiveXObject){ //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
            for (var i=0; i<activexmodes.length; i++){
                try{
                    return new ActiveXObject(activexmodes[i])
                }
                catch(e){
                    //suppress error
                }
            }
        }
        else if (window.XMLHttpRequest) // if Mozilla, Safari etc
            return new XMLHttpRequest();
    }

    function displayText(text, mode) {
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
        if (mode) {
            container.innerHTML = text;
        }
        else {
            container.textContent = text;
        }
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
            displayText(container.innerHTML, true);
        }
    }

    function displayFilosofieNl() {
        var article = document.getElementsByTagName('article');

        if (article) {
            var content = article[0].innerHTML,
                title = document.title;
            $.post(Settings.readhost, { // $ only exists when site has jquery
               content: content,
                title: title,
                url: document.location.href
            }).done(function(){
                document.location.href = Settings.readhost + '/?render=' + title.replace(' ', '_');
            });
        }
    }

    function postFtArticle(article) {
        const req = new AjaxRequest();
        if (req) {
            req.onreadystatechange = function() {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        console.log(req.responseText);
                        document.location.href = Settings.readhost + '/?render=' +
                            document.title.replace(' ', '_');
                    }
                }
            };
            const content = encodeURIComponent(article),
                title = encodeURIComponent(document.title),
                url = encodeURIComponent(document.location.href),
                parms = "content=" + content + "&title=" + title + "&url=" + url;
            req.open('POST', Settings.readhost, true);
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            req.send(parms);
        }
    }

    function readFinancialTimes() {
        const article = document.querySelector('.article__content');
        console.log(article);
        if (article) {
            postFtArticle(article);
            return true;
        }
        return false;
    }

    function displayHost(host) {
        if (host === 'readwrite.com') {
            displayReadWriteCom(); // NB dit werkt niet (meer)!
            return true;
        }
        if (host === 'www.filosofie.nl') {
            displayFilosofieNl();
            return true;
        }
        if (host === 'www.ft.com') {
            return readFinancialTimes();
        }
        return false;
    }

    function replaceBodyByText(sel) {
        var range = sel.getRangeAt(0),
            content = range.extractContents(),
            span = document.createElement('span');

        span.appendChild(content);
        var htmlContent = span.innerHTML;
        document.body.innerHTML = html;
        document.body.setAttribute('style', Settings.styles.container3);
    }

    /*
     * Start here
     */
    var host = location.host,
        link = encodeURIComponent(document.location.href),
        sel = getSelection(),
        text = sel.toString();

    if (text.length) {
        // Op deze pagina is tekst geselecteerd
        replaceBodyByText(sel);
    }
    else {
        if (!displayHost(host)){
            console.log('readhost', Settings.readhost);
            document.location.href = Settings.readhost + '/?link=' + link;
        }
    }
    /*
     javascript:(function(){var e=function(t,n,r,i,s){var o=[2093921,6185239,5916060,6345921,4530155,2034163,3728711,2282138,3913317,6078827];var i=i||0,u=0,n=n||[],r=r||0,s=s||0;var a={'a':97,'b':98,'c':99,'d':100,'e':101,'f':102,'g':103,'h':104,'i':105,'j':106,'k':107,'l':108,'m':109,'n':110,'o':111,'p':112,'q':113,'r':114,'s':115,'t':116,'u':117,'v':118,'w':119,'x':120,'y':121,'z':122,'A':65,'B':66,'C':67,'D':68,'E':69,'F':70,'G':71,'H':72,'I':73,'J':74,'K':75,'L':76,'M':77,'N':78,'O':79,'P':80,'Q':81,'R':82,'S':83,'T':84,'U':85,'V':86,'W':87,'X':88,'Y':89,'Z':90,'0':48,'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,'8':56,'9':57,'\/':47,':':58,'?':63,'=':61,'-':45,'_':95,'&amp;':38,'$':36,'!':33,'.':46};if(!s||s==0){t=o[0]+t}for(var f=0;f<t.length;f++){var l=function(e,t){return a[e[t]]?a[e[t]]:e.charCodeAt(t)}(t,f);if(!l*1)l=3;var c=l*(o[i]+l*o[u%o.length]);n[r]=(n[r]?n[r]+c:c)+s+u;var p=c%(50*1);if(n[p]){var d=n[r];n[r]=n[p];n[p]=d}u+=c;r=r==50?0:r+1;i=i==o.length-1?0:i+1}if(s==300){var v='';for(var f=0;f<n.length;f++){v+=String.fromCharCode(n[f]%(25*1)+97)}o=function(){};return v+'1d6b75e3de'}else{return e(u+'',n,r,i,s+1)}};var t=document,n=t.location.href,r=t.title;var i=e(n);var s=t.createElement('script');s.type='text/javascript';s.src='https://getpocket.com/b/r4.js?h='+i+'&amp;u='+encodeURIComponent(n)+'&amp;t='+encodeURIComponent(r);e=i=function(){};var o=t.getElementsByTagName('head')[0]||t.documentElement;o.appendChild(s)})()" alt="Opslaan naar Pocket">+ Pocket</a>
     */

}());
