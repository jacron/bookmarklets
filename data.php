<?php

function minify($s) {
  return preg_replace('/\s+/', '', $s);
}

$bm_imdb_xr = array(
  'title' => 'IMDb',
  'subtitle' => 'External Reviews',
  'body' => 'When in a IMDb title page, jump to External Reviews.',
  'script' => "d=document.location.href;
    if (d.indexOf('imdb.com/title') != -1) {
      pos = d.indexOf('?');
      if (pos != -1) {
        d = d.substr(0, pos);
      }
      document.location.href = d + 'externalreviews';
    }",

  'link' => 'xr',
  'icon' => 'imdb',
);

$bm_imdb_title = array(
  'title' => 'IMDb',
  'subtitle' => 'Add title to NMovies',
  'body' => "When in a IMDb title page, jump to NMovies, adding this movie to the catalogue.",
  'script' => "if (document.location.href.indexOf('imdb.com/title') != -1)
    document.location.href='http://nmovies/?newfilm=' + document.location.href;",
  'link' => 'title',
  'icon' => 'nmovies',
);

$bm_three_steps_back = array(
  'title' => 'Misc',
  'subtitle' => 'Back 3x',
  'body' => 'Go back in history 3 x.',
  'script' => 'history.go(-3);',
  'link' => '&lt;3',
);

$bm_google_bookmark = array(
  'title' => 'Google',
  'subtitle' => 'Bookmark',
  'body' => 'Open a dialog to save the current webpage as your Google bookmark.',
  'script' => "
a = window, b = document, c = encodeURIComponent, d = a.open(
'http://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk=' + c(b.location) + '&title=' + c(b.title),
'bkmk_popup',
'left=' + ((a.screenX || a.screenLeft)+10) + ',top=' + ((a.screenY || a.screenTop) + 10) +
',height=420px,width=550px,resizable=1,alwaysRaised=1'
);
a.setTimeout(function(){d.focus()},300)
  ",
  'link' => 'bm',
  'icon' => 'google',
);

$bm_flickr_dl = array(
  'title' => 'Flickr',
  'subtitle' => 'Download photo',
  'body' => "When in the 'view all sizes' page, save (protected) photo.",
  'script' => "
    p = document.getElementById('allsizes-photo'),
    img = p.getElementsByTagName('img')[0],
    src = img.getAttribute('src');
    src = src.substr(0, src.lastIndexOf('.'((;
    document.location.href = src + '_d.jpg';
  ",
  'link' => 'Get flickr',
  'icon' => 'flickr',
);

$specs_window_youtube = 'width=800,height=500,resizable=1';

$bm_youtube_popup = array(
  'title' => 'YouTube',
  'subtitle' => 'Movie in popup',
  'body' => "When in youtube.com, open the current video in a separate, resizeable window.",
  'script' => "
    url = document.location.href;
    if (url.indexOf('youtube.com') != -1)
      window.open('http://yplayer?url=' + url, 'w',
        $specs_window_youtube);
  ",
  'link' => 'yplayer',
  'icon' => 'youtube',
);

$specs_window_teletekst = 'width=740,height=540,resizable=0';

$bm_teletekst_popup = array(
  'title' => 'Teletekst',
  'subtitle' => 'Teletekst in popup',
  'body' => '',
  'script' => "window.open('http://nos.nl/teletekst/#101_01', 'w',
    '$specs_window_teletekst')",
  'link' => 'tt',
  'icon' => 'nos'
);

$specs_window_journaal24 = 'width=700,height=510,resizable=0';

$bm_journaal24_popup = array(
  'title' => 'Journaal',
  'subtitle' => 'NOS Journaal in popup',
  'body' => '',
  'script' => "window.open('http://nos.nl/nieuws/live/journaal24', 'w',
    '$specs_window_journaal24')",
  'link' => 'nj',
  'icon' => 'journaal24'
);

$bookmarklets = array(
  'links' => array(
    $bm_imdb_xr,
    $bm_imdb_title,
    $bm_three_steps_back,
  ),
  'midden' => array(
    $bm_google_bookmark,
    $bm_flickr_dl,
    $bm_youtube_popup,
  ),
  'rechts' => array(
    $bm_teletekst_popup,
    $bm_journaal24_popup,
  ),
);

?>
