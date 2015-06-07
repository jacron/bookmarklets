<?php
//bookmarklets/index.php

/* BookmarkletsArranger
 *
 * Opvolger van getpic.html, de pagina met mijn bookmarklets.
 * Scheiding van data en opmaak-elementen.
 * * Zelfs leesbare javascriptcode mogelijk.
 * * De javascript code regel(s) wordt geminified en in een closure verpakt.
 * * Er wordt nu steeds gecontroleerd of de locatie van de website wel klopt voor deze actie.
 */

include 'View.php'; // Class rendering the tiles
include 'Bookmarklet.php';  // Class for properties and rendering a bookmarklet tile
if (isset($_REQUEST['special']) && $_REQUEST['special'] == 'own') {
  include 'Data.private.module';
}
else {
  include 'Data.module';  // An array holding the data
}

$title = 'BookmarkletsArranger';
$settings = array(
  'scriptpath' =>  'scripts/'
);
?>
<html>
<head>
<title><?=$title ?></title>
    <link rel="stylesheet" type="text/css" href="css/main.css">
</head>
<body>
<div id="pagecontent">
  <div class="title">* <?=$title ?> *</div>
  <div class="content">
    <?php print View::renderTiles(); ?>
        <?php
        $openerJs = 'http://' . $_SERVER['HTTP_HOST'] . '/scripts/opener2.js';
        $openerJs3 = 'http://' . $_SERVER['HTTP_HOST'] . '/scripts/opener3.js';
        ?>
    <div class="clear"></div>
  <div class="footer">
    <a id="perfect-site" href="http://jcroonen.nl">jcroonen.nl</a> |
    <a href="http://jcroonen.nl/assets/images/boek/9043007242.jpg">boekje</a> |
    <a href="http://bookmarklets.com">bookmarklets.com</a>
  </div>
</div>
</body>
</html>
