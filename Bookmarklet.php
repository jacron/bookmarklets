<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Bookmarklet
 *
 * @author jan
 */
class Bookmarklet {
  private $title;
  private $subtitle;
  private $body;
  private $script;
  private $file;
  private $link;
  private $icon;

  /**
   * Constructor, intializing all fields
   * @param array $data
   */
  function __construct($data) {
    // obligatory fields
    $this->title = $data['title'];
    $this->subtitle = $data['subtitle'];
    $this->body = $data['body'];

    // optional fields
    if (isset($data['script'])) {
      $this->script = $data['script'];
    }
    if (isset($data['file'])) {
      $this->file = $data['file'];
    }
    if (isset($data['link'])) {
      $this->link = $data['link'];
    }
    if (isset($data['icon'])) {
      $this->icon = $data['icon'];
    }
  }

  private function removeComment($s) {
    // remove line-comment
    $lines = explode("\n", $s);
    //error_log('removing comment');
    for ($i = 0; $i < count($lines); $i++) {
      $squoting = false;
      $dquoting = false;
      $lastchar = '';
      for ($j = 0; $j < strlen($lines[$i]); $j++) {
        $char = $lines[$i][$j];
        if ($char == '\'') {
          $squoting = !$squoting;
        }
        if ($char == '"') {
          $dquoting = !$dquoting;
        }
        if (!$squoting && !$dquoting) {
          if ($char == '/' && $lastchar == '/'){
            $lines[$i] = substr($lines[$i], 0, $j-1);
            break;
          }
        }
        $lastchar = $char;
      }
    }
    $s = implode("\n", $lines);

    // remove multi-line comment
    $s = preg_replace("/\/\*([\s\S]*?)\*\//", '', $s);

    return $s;
  }

  /**
   * Remove all white space, except for after var statement.
   * Also remove comments.
   * @param string $s e.g. javascript
   * @return string
   */
  private function minify($s) {
    $s = $this->removeComment($s);

    return preg_replace('/\s+/', '',
      str_replace('var ', 'var&nbsp;',
      str_replace('return ', 'return&nbsp;',
      str_replace('"', '&quot;', $s))));
  }

  private function renderScript() {
    $script = $this->minify($this->script);
    return "<hr><a href=\"javascript:(function(){" . $script .
            "})();\">" . $this->link . "</a>";
  }

  private function renderFile() {

    global $settings;

    $file = file_get_contents($settings['scriptpath'] . $this->file);
    $script = $this->minify($file);
    return "<hr><a href=\"javascript:" . $script . "\">" . $this->link . "</a>";
  }

  public function makeTile() {
    $html = '<div class="aux-content-widget">';
    if (!empty($this->icon)) {
      $html .= '<div class="icon ' . $this->icon . '"></div>';
    }
    $html .= '<h1>' . $this->title . '</h1>';
    $html .= '<h2>' . $this->subtitle . '</h2>';
    $html .= '<div class="description">' . $this->body . '</div>';
    if (!empty($this->script)) {
      $html .= $this->renderScript();
    }
    else if (!empty($this->file)) {
      $html .= $this->renderFile();
    }
    $html .= '</div>';
    return $html;
  }
}

?>
