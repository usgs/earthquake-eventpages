<?php
if (!isset($TEMPLATE)) {

  $TITLE = 'Impact Pin View';

  // If you want to include section navigation.
  // The nearest _navigation.inc.php file will be used by default
  $NAVIGATION = true;

  // Stuff that goes at the top of the page (in the <head>) (i.e. <link> tags)
  $HEAD = '
    <link rel="stylesheet" href="/css/event.css"/>
    <style>
      .impact-pin-view-example {
        height: 310px;
        margin-top: 1em;
        width: 210px;
      }
    </style>
  ';

  // Stuff that goes at the bottom of the page (i.e. <script> tags)
  $FOOT = '
    <script src="/js/classes.js"></script>
    <script src="ImpactPinViewExample.js"></script>
  ';

  include 'template.inc.php';
}
?>

<div class="impact-pin-view-example"></div>
