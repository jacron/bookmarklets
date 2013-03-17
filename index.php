<?php
//bookmarklets/index.php

/* Opvolger van getpic.html, de pagina met mijn bookmarklets.
 * Scheiding van data en opmaak-elementen.
 * * Zelfs leesbare javascriptcode mogelijk.
 * * De javascript code regel(s) wordt geminified en in een closure verpakt.
 * * Er wordt nu steeds gecontroleerd of de locatie klopt voor deze actie.
 */

include 'Bookmarklets.php';
include 'Bookmarklet.php';

$title = 'Bookmarklets - by JC';
$bookmarklets = new Bookmarklets();
$settings = array(
  'scriptpath' =>  'scripts/'
);
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
      <?php print $bookmarklets->renderColumns(); ?>
    </tr>
  </table>
  <div class="footer">
    <a id="perfect-site" href="http://jcroonen.nl">jcroonen.nl</a>
    <a href="http://jcroonen.nl/assets/images/boek/9043007242.jpg">boekje</a>
  </div>
</div>
</body>
</html>
