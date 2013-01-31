<?php

/* Opvolger van getpic.html, de pagina met mijn bookmarklets.
 * Scheiding van data en opmaak-elementen.
 * * Zelfs leesbare javascriptcode mogelijk.
 * * De javascript code regel(s) wordt geminified en in een closure verpakt.
 * * Er wordt nu steeds gecontroleerd of de locatie klopt voor deze actie.
 */
include 'build.php';
?>
<html>
<head>
<title>Bookmarklets by JC</title>
    <link rel="stylesheet" type="text/css" href="main.css">
</head>
<body>
<div id="pagecontent">
  <div class="title">Bookmarklets - by JC</div>
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
