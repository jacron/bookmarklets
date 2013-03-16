<?php
//bookmarklets/index.php

/* Opvolger van getpic.html, de pagina met mijn bookmarklets.
 * Scheiding van data en opmaak-elementen.
 * * Zelfs leesbare javascriptcode mogelijk.
 * * De javascript code regel(s) wordt geminified en in een closure verpakt.
 * * Er wordt nu steeds gecontroleerd of de locatie klopt voor deze actie.
 */

include 'Bookmarklets.php';

/**
 * Remove all white space.
 * @param string $s e.g. javascript
 * @return string
 */
function minify($s) {
  return preg_replace('/\s+/', '', preg_replace('/var /', 'var&nbsp;', $s));
}

function column($col, $bms) {
  $html = '';
  foreach ($bms[$col] as $bm) {
    $html .= '<div class="aux-content-widget">';
    if (isset($bm['icon'])) {
      $html .= '<div class="icon ' . $bm['icon'] . '"></div>';
    }
    $html .= '<h1>' . $bm['title'] . '</h1>';
    $html .= '<h2>' . $bm['subtitle'] . '</h2>';
    $html .= '<div class="description">' . $bm['body'] . '</div>';
    if (isset($bm['script'])) {
      $script = minify($bm['script']);
      $link = $bm['link'];
      $html .= "<hr><a href=\"javascript:(function(){" . $script . "})();\">$link</a>";
    }
    $html .= '</div>';
  }
  return $html;
}

$title = 'Bookmarklets - by JC';
$bookmarklets = new Bookmarklets();
$bms = $bookmarklets->get();

?>
<html>
<head>
<title><?=$title ?></title>
    <link rel="stylesheet" type="text/css" href="main.css">
</head>
<body>
<div id="pagecontent">
  <div class="title"><?=$title ?></div>
  <table>
    <tr>
      <td><?php print column('links', $bms)?></td>
      <td><?php print column('midden', $bms)?></td>
      <td><?php print column('rechts', $bms)?></td>
    </tr>
  </table>
  <div class="footer">
    <a id="perfect-site" href="http://jcroonen.nl">jcroonen.nl</a>
    <a href="http://jcroonen.nl/assets/images/boek/9043007242.jpg">boekje</a>
  </div>
</div>
</body>
</html>
