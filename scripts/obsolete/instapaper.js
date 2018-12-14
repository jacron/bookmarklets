/* 
 * Author: jan
 * Date: Dec 5, 2013
 */


function iprl5(){
    var d = document,
        z = d.createElement('scr'+'ipt'),
        b = d.body,
        l = d.location,
        src = l.protocol +
           '//www.instapaper.com/j/6kJgiley3gm9?a=read-later&u=' + 
           encodeURIComponent(l.href) + '&t=' + (new Date().getTime());
    
    try {
        if (!b) throw(0);
        d.title = '(Saving...) ' + d.title;
        console.log(src);
        z.setAttribute('src', src);
        b.appendChild(z);
    } 
    catch(e){
        alert('Please wait until the page has loaded.');
    }
}
iprl5();
void(0)
