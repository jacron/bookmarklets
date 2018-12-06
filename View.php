<?php

class View
{

    /**
     * Get 3 td elements as columns, filled with rendered bookmarklets.
     * @return string
     */
    public static function renderTiles()
    {
        global $tiles;

        $html = '';
        foreach ($tiles as $tile) {
            $b = new Bookmarklet($tile);
            $html .= $b->makeTile();
        }
        return $html;
    }

    public static function renderFooter()
    {
        $html = <<<EOT
  <div class="footer">
    <a id="perfect-site" href="http://jcroonen.nl">jcroonen.nl</a> |
    <a href="http://jcroonen.nl/assets/images/boek/9043007242.jpg">boekje</a> |
    <a href="http://bookmarklets.com">bookmarklets.com</a>
  </div>
EOT;
        return $html;

    }
}
