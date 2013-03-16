<?php

class Bookmarklets {

  private $serverport = ':8080';  // leave empty when using port 80 for local apps

  // windows specs: http://www.w3schools.com/jsref/met_win_open.asp
  private $specs_window_youtube = 'width=800,height=500,resizable=1';
  private $specs_window_teletekst = 'width=740,height=540,resizable=0';
  private $specs_window_journaal24 = 'width=700,height=510,resizable=0';
  private $specs_google_bookmarks = 'height=420px,width=550px,resizable=1,alwaysRaised=1';

  // local urls
  private $url_youtube_player = 'http://yplayer';
  private $nmovies_url = 'http://nmovies';

  // remote urls
  private $google_bookmarks = 'http://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk=';
  private $nos_teletekst = 'http://nos.nl/teletekst/#101_01';
  private $nos_journaal24 = 'http://nos.nl/nieuws/live/journaal24';

  private function nmoviesNewUrl() {
    $url = $this->nmovies_url . $this->serverport . '?newfilm=';
    return $url;
  }

  /**
   * Haal drie kolommen met bookmarklets op,
   */
  public function get() {
    return array(
      'links' => array(
        $this->bm_imdb_xr(),
        $this->bm_imdb_title(),
        $this->bm_three_steps_back(),
      ),
      'midden' => array(
        $this->bm_google_bookmark(),
        $this->bm_flickr_dl(),
        $this->bm_youtube_popup(),
      ),
      'rechts' => array(
        $this->bm_teletekst_popup(),
        $this->bm_journaal24_popup(),
        $this->bm_open_all_images(),
      ),
    );
  }

  private function bm_imdb_xr() {
    return array(
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
  }

  /**
   * When in a IMDb title page, open NMovies in another window (tab),
   * adding this movie to the catalogue.
   * @return array
   */
  private function bm_imdb_title() {
    return array(
      'title' => 'IMDb',
      'subtitle' => 'Add title to NMovies',
      'body' => "When in a IMDb title page, open NMovies in another tab, adding this movie to the catalogue.",
      'script' => "if (document.location.href.indexOf('imdb.com/title') != -1)
        window.open('" . $this->nmoviesNewUrl() . "' + document.location.href);",
      'link' => 'title',
      'icon' => 'nmovies',
    );
  }

  private function bm_three_steps_back() {
    return array(
      'title' => 'Misc',
      'subtitle' => 'Back 3x',
      'body' => 'Go back in history 3 x.',
      'script' => 'history.go(-3);',
      'link' => '&lt;3',
    );
  }

  private function bm_google_bookmark() {
    return array(
      'title' => 'Google',
      'subtitle' => 'Bookmark',
      'body' => 'Open a dialog to save the current webpage as your Google bookmark.',
      'script' => "
    a = window, b = document, c = encodeURIComponent, d = a.open(
    '$this->google_bookmarks' + c(b.location) + '&title=' + c(b.title),
    'bkmk_popup',
    'left=' + ((a.screenX || a.screenLeft)+10) + ',top=' + ((a.screenY || a.screenTop) + 10) +
    ',$this->specs_google_bookmarks'
    );
    a.setTimeout(function(){d.focus()},300)
      ",
      'link' => 'bm',
      'icon' => 'google',
    );
  }

  private function bm_flickr_dl() {
    return array(
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
  }

  private function bm_youtube_popup() {
    return array(
      'title' => 'YouTube',
      'subtitle' => 'Movie in popup',
      'body' => "When in youtube.com, open the current video in a separate, resizeable window.",
      'script' => "
        url = document.location.href.replace('&','_and_');
        if (url.indexOf('youtube.com') != -1){
          window.open('" . $this->url_youtube_player . $this->serverport .
          "?url=' + url, 'w', '" . $this->specs_window_youtube . "');
        }
      ",
      'link' => 'yplayer',
      'icon' => 'youtube',
    );
  }

  private function bm_teletekst_popup() {
    return array(
      'title' => 'Teletekst',
      'subtitle' => 'Teletekst in popup',
      'body' => '',
      'script' => "window.open('$this->nos_teletekst', 'w',
        '" . $this->specs_window_teletekst . "')",
      'link' => 'tt',
      'icon' => 'nos'
    );
  }

  private function bm_journaal24_popup() {
    return array(
      'title' => 'Journaal',
      'subtitle' => 'NOS Journaal in popup',
      'body' => '',
      'script' => "window.open('$this->nos_journaal24', 'w',
        '" . $this->specs_window_journaal24 . "')",
      'link' => 'nj',
      'icon' => 'journaal24'
    );
  }

  private function bm_open_all_images() {
    return array(
      'title' => 'Afbeeldingen Opener',
      'subtitle' => 'Open links als afbeeldingen',
      'body' => "Bedoeld voor lijstjes op pagina's met de tekst 'Index of'",
      'script' => "
        var bm_links=document.links,
          bm_len=bm_links.length,
          href,
          bm_link,
          is_image,
          text,
          oldtext,
          ul;

        ul = document.getElementsByTagName('ul');
        if (ul.length > 0) {
          ul[0].style.listStyle = 'none';
          li = document.getElementsByTagName('li');
          for(i=0; i<li.length; i++){
            li[i].style.display = 'inline';
          }
        }

        for (i = 0; i < bm_len; i++){
          bm_link = bm_links[i];
          href = bm_link.href;
          is_image = href.indexOf('jpg') != -1 || href.indexOf('JPG') != -1 || href.indexOf('png') != -1;
          if (href.indexOf('http') == 0 && is_image) {

              img = document.createElement('img');
              img.src = href;
              img.width = '300';

              bm_link.appendChild(img);
              oldtext = img.previousSibling;
              bm_link.removeChild(oldtext);

              bm_link.target = '_blank';
          }
        }
        ",
      'link' => 'opener',
      'icon' => 'image'
    );
  }

}
