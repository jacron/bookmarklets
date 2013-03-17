(function(){
  var url = 'http://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk=',
    a = window,
    b = document,
    c = encodeURIComponent,
    specs =
      'left=' + ((a.screenX || a.screenLeft)+10) + ',top=' + ((a.screenY || a.screenTop) + 10) +
      ',height=420px,width=550px,resizable=1,alwaysRaised=1',
    d = a.open(url + c(b.location) + '&title=' + c(b.title), 'bkmk_popup', specs);

  a.setTimeout(function(){d.focus()},300)
}());
