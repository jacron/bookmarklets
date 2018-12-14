/* 
 * Author: jan
 * Date: Dec 5, 2013
 */
function bm_alert(msg) {
    var $div = $('div');
    $div.css({
        position: 'absolute',
        top: 0,
        left: 10,
        color: '#afe',
        'background-color': '#000'
    });
    $div.html(msg);
    $('document body').append($div);
}
function sendForm() {
    var i = document.createElement('iframe'),
        url = encodeURIComponent(document.location.href);
    
    i.setAttribute('name', 'ipb507816');
    i.setAttribute('id', 'ipb507816');
    i.setAttribute('allowtransparency', 'true');
    i.setAttribute('style', 'border:0; position:absolute; left:0; top:0; width:100%;');
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

(function(){

	// the minimum version of jQuery we want
	var minJqV = '1.3.2',
        jqV = '1.10.3';

	// check prior inclusion and version
	if (window.jQuery === undefined || window.jQuery.fn.jquery < minJqV) {
		var done = false;
		var script = document.createElement("script");
		script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + jqV + "/jquery.min.js";
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				getFilm();
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	} else {
        console.log(window.jQuery.fn.jquery); // 1.7.2
		getFilm();
	}
})();
function getFilm() {
    if (document.location.href.indexOf('imdb.com/title') !== -1) {
        sendForm();
    }
    else {
        bm_alert('Dit is geen IMDb pagina!');
    }
}
