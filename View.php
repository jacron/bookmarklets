<?php

class View {

  /**
   * Get 3 td elements as columns, filled with rendered bookmarklets.
   * @return string
   */
  public static function renderTiles() {
    global $tiles;

    $html = '';
    foreach($tiles as $tile) {
      $b = new Bookmarklet($tile);
      $html .= $b->makeTile();
    }
    return $html;
  }
}
