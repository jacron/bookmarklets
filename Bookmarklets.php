<?php

class Bookmarklets {

  /**
   * Get 3 td elements as columns, filled with rendered bookmarklets.
   * @return string
   */
  public static function renderColumns() {
    global $columns;

    $html = '';
    foreach($columns as $column) {
      $html .= '<td>';
      foreach($column as $bm) {
        $b = new Bookmarklet($bm);
        $html .= $b->makeTile();
      }
      $html .= '</td>';
    }
    return $html;
  }
}
