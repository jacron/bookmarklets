/*
 * Author: jan
 * Date: 15-mei-2014
 */
'use strict';

(function(){
    function getFirstByAttribute(elms, attr, value) {
        for (var i=0; i<elms.length; i++) {
            var elm = elms[i];
            if (elm.getAttribute(attr) == value) {
                return elm;
            }
        }
        return null;
    }

    var  head = document.head || document.getElementsByTagName('head')[0],
         links = head.getElementsByTagName('link'),
         printLink = getFirstByAttribute(links, 'media', 'print'),
         cssParm = '',
         urlParm,
         redirect;

    //console.log(printlink.href);
        urlParm = '?link=' + encodeURIComponent(document.location.href);
        if (printLink) {
            cssParm = '&pcss=' + encodeURIComponent(printLink.href);
        }
        redirect = 'http://read.text:85/' + urlParm + cssParm;
        //console.log(redirect);
        document.location.href = redirect;

})();


