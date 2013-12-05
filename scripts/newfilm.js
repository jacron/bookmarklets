/* 
 * Author: jan
 * Date: Dec 5, 2013
 */
function bm_alert(msg) {
    var div = document.createElement('div');
    div.innerHTML = msg;
    var s = div.style;
    s.backgroundColor = '#000';
    s.color = '#afe';
    s.position = 'absolute';
    s.top = '30px';
    s.left = '100px';
    s.padding = '8px 12px';
    document.body.appendChild(div);
}
/*
function sendNewFilmToCatalog() {
    var xmlhttp;
    
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
      xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            bm_alert(xmlhttp.responseText);
        }
    };
    xmlhttp.open('POST', 'http://dev.movies13', true);
    xmlhttp.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xmlhttp.send(JSON.stringify({
        service: 'newfilm', 
        url: encodeURIComponent(document.location.href) 
    }));
}
*/
function sendForm() {
    var i = document.createElement('iframe'),
        url = encodeURIComponent(document.location.href);
    
    i.setAttribute('name', 'ipb507816');
    i.setAttribute('id', 'ipb507816');
    i.setAttribute('allowtransparency', 'true');
    i.setAttribute('style', 'border: 0; position: absolute; left: 0; top: 0;');
    //i.setAttribute('onload', 'frameDidLoadipb507816++; frameLoadedipb507816();');
    document.body.appendChild(i);
    window.frames['ipb507816'].document.write(
            
    '<html><body style="background-color: transparent;">' +

    '<form action="http://dev.movies13?service=newfilm" method="post" id="f" accept-charset="utf-8">' +
    '<input type="hidden" name="url" id="url" value="' + url + '"/>' +
    '</form>' +
    
    "<scr"+"ipt>var d=document;" +
    "d.getElementById('f').submit();" +
    "</scr"+"ipt></body></html>"
    
    );
}

if (document.location.href.indexOf('imdb.com/title') !== -1) {
    //sendNewFilmToCatalog();
    sendForm();
}
else {
    bm_alert('Dit is geen IMDb pagina!');
}


