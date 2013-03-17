<?php

class Bookmarklets {

  public function getColumns() {
    return array(
      array(
        $this->bm_imdb_xr(),
        $this->bm_imdb_title(),
        $this->bm_three_steps_back(),
      ),
      array(
        $this->bm_google_bookmark(),
        $this->bm_flickr_dl(),
        $this->bm_youtube_popup(),
      ),
      array(
        $this->bm_teletekst_popup(),
        $this->bm_journaal24_popup(),
        $this->bm_open_all_images(),
      ),
    );
  }

  public function renderColumns() {
    $columns = $this->getColumns();

    $html = '';
    foreach($columns as $column) {
      $html .= '<td>';
      foreach($column as $bm) {
        $html .= $bm->makeTile();
      }
      $html .= '</td>';
    }
    return $html;
  }

  private function bm_imdb_xr() {
    return new Bookmarklet(array(
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
    ));
  }

  private function bm_imdb_title() {
    return new Bookmarklet(array(
      'title' => 'IMDb',
      'subtitle' => 'Add title to NMovies',
      'body' => "When in a IMDb title page, open NMovies in another tab, adding this movie to the catalogue.",
      'script' => "
        url = 'http://nmovies:8080?newfilm=';
        if (document.location.href.indexOf('imdb.com/title') != -1)
        window.open(url + document.location.href);",
      'link' => 'title',
      'icon' => 'nmovies',
    ));
  }

  private function bm_three_steps_back() {
    return new Bookmarklet(array(
      'title' => 'Misc',
      'subtitle' => 'Back 3x',
      'body' => 'Go back in history 3 x.',
      'script' => 'history.go(-3);',
      'link' => '&lt;3',
    ));
  }

  private function bm_google_bookmark() {
    return new Bookmarklet(array(
      'title' => 'Google',
      'subtitle' => 'Bookmark',
      'body' => 'Open a dialog to save the current webpage as your Google bookmark.',
      'file' => 'google_bm.js',
      'link' => 'bm',
      'icon' => 'google',
    ));
  }

  private function bm_flickr_dl() {
    return new Bookmarklet(array(
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
    ));
  }

  private function bm_youtube_popup() {
    return new Bookmarklet(array(
      'title' => 'YouTube',
      'subtitle' => 'Movie in popup',
      'body' => "When in youtube.com, open the current video in a separate, resizeable window.",
      'script' => "
        url = document.location.href.replace('&','_and_');
        url_yt = 'http://yplayer:8080';
        specs = 'width=800,height=500,resizable=1';
        if (url.indexOf('youtube.com') != -1){
          window.open(url_yt + '?url=' + url, 'w', specs);
        }
      ",
      'link' => 'yplayer',
      'icon' => 'youtube',
    ));
  }

  private function bm_teletekst_popup() {
    return new Bookmarklet(array(
      'title' => 'Teletekst',
      'subtitle' => 'Teletekst in popup',
      'body' => '',
      'script' => "
        specs = 'width=740,height=540,resizable=0';
        url = 'http://nos.nl/teletekst/#101_01';
        window.open(url, 'w', specs);",
      'link' => 'tt',
      'icon' => 'nos'
    ));
  }

  private function bm_journaal24_popup() {
    return new Bookmarklet(array(
      'title' => 'Journaal',
      'subtitle' => 'NOS Journaal in popup',
      'body' => '',
      'script' => "
        url = 'http://nos.nl/nieuws/live/journaal24';
        specs = 'width=700,height=510,resizable=0';
        window.open(url, 'w', specs);",
      'link' => 'nj',
      'icon' => 'journaal24'
    ));
  }

  private function bm_open_all_images() {
    return new Bookmarklet(array(
      'title' => 'Image Opener',
      'subtitle' => 'Load images from links',
      'body' => "Tool for immediately viewing pictures on a page that only has links (e.g. 'Index of')",
      'file' => 'opener.js',
      'link' => 'opener',
      'icon' => 'image'
    ));
  }

}
