/* 
 * Author: jan
 * Date: Dec 5, 2013
 */
function getFilm() {
    if (document.location.href.indexOf('imdb.com/title') !== -1) {
        sendForm();
    }
    else {
        bm_alert('Dit is geen IMDb pagina!');
    }
}

(function(){
    var script = document.createElement("script");
    
    script.src = "http://dev.movies13/js/addfilm.js";
    script.onload = script.onreadystatechange = function(){
        if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
            getFilm();
        }
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();
