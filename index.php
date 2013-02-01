<?php

/* Opvolger van getpic.html, de pagina met mijn bookmarklets.
 * Scheiding van data en opmaak-elementen.
 * * Zelfs leesbare javascriptcode mogelijk.
 * * De javascript code regel(s) wordt geminified en in een closure verpakt.
 * * Er wordt nu steeds gecontroleerd of de locatie klopt voor deze actie.
 */

include 'data.php';  // data, with the javascript

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

$title = 'Bookmarklets - by JC';
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
      <td><?php print column('links')?></td>
      <td><?php print column('midden')?></td>
      <td><?php print column('rechts')?></td>
    </tr>
  </table>
</div>
</body>
</html>
