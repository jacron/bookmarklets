<?php

function minify($s) {
  return preg_replace('/\s+/', '', $s);
}

$bookmarklets = array(
  'links' => array(
    array(
      'title' => 'IMDb',
      'subtitle' => 'External Reviews',
      'body' => 'Jump to External Reviews from a IMDb title page.',
      'script' => "d=document.location.href;
        if (d.indexOf('imdb.com') != -1) {
          pos = d.indexOf('?');
          if (pos != -1) {
            d = d.substr(0, pos);
          }
          document.location.href = d + 'externalreviews';
        }",

      'link' => 'xr',
      'icon' => 'imdb',
    ),
    array(
      'title' => 'NMovies',
      'subtitle' => 'Get title from IMDb',
      'body' => 'Jump to NMovies, delivering the url of the IMDb titlepage you are visiting.',
      'script' => "if (document.location.href.indexOf('imdb.com/title') != -1)
        document.location.href='http://nmovies/?newfilm=' + document.location.href;",
      'link' => 'title',
      'icon' => 'nmovies',
    ),
    array(
      'title' => 'Misc',
      'subtitle' => 'Back 3x',
      'body' => 'Go back in history 3 x.',
      'script' => 'history.go(-3);',
      'link' => '&lt;3',
    ),
  ),
  'midden' => array(
    array(
      'title' => 'Google',
      'subtitle' => 'Bookmark',
      'body' => 'Save the current webpage as your Google bookmark.',
      'script' => "
  a = window, b = document, c = encodeURIComponent, d = a.open(
  'http://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk='+c(b.location)+'&title='+c(b.title),
  'bkmk_popup',
  'left=' + ((a.screenX || a.screenLeft)+10) + ',top=' + ((a.screenY || a.screenTop) + 10) +
  ',height=420px,width=550px,resizable=1,alwaysRaised=1'
);
a.setTimeout(function(){d.focus()},300)
      ",
      'link' => 'bm',
      'icon' => 'google',
    ),
    array(
      'title' => 'Flickr',
      'subtitle' => 'Download photo',
      'body' => "In the 'view all sizes' page: open protected photo in the current browser tab.",
      'script' => "
        p = document.getElementById('allsizes-photo'),
        img = p.getElementsByTagName('img')[0],
        src = img.getAttribute('src');
        src = src.substr(0, src.lastIndexOf('.'((;
        document.location.href = src + '_d.jpg';
      ",
      'link' => 'Get flickr',
      'icon' => 'flickr',
    ),
    array(
      'title' => 'YouTube',
      'subtitle' => 'Movie in popup',
      'body' => 'Open the movie in \'yplayer\'.',
      'script' => "
        url = document.location.href;
        if (url.indexOf('youtube.com') != -1)
          window.open('http://yplayer?url=' + url, 'w',
            'width=800,height=500,resizable=1');
      ",
      'link' => 'yplayer',
      'icon' => 'youtube',
    ),

  ),
  'rechts' => array(
  ),
);

function column($col) {
  global $bookmarklets;
  $html = '';
  foreach ($bookmarklets[$col] as $bm) {
    $html .= '<div class="aux-content-widget">';
    if (isset($bm['icon'])) {
      $html .= '<div class="icon ' . $bm['icon'] . '"></div>';
    }
    $html .= '<h1>' . $bm['title'] . '</h1>';
    $html .= '<h2>' . $bm['subtitle'] . '</h2>';
    $html .= '<div class="description">' . $bm['body'] . '</div>';
    if (isset($bm['script'])) {
      $html .= '<hr><a href="javascript:(function(){' . minify($bm['script']) . '})();">' .
        $bm['link'] . '</a>';
    }
    $html .= '</div>';
  }
  return $html;
}
?>
