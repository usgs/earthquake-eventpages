<?php
if (!isset($TEMPLATE)) {

  $TITLE = 'OriginPinViewExample';

  // If you want to include section navigation.
  // The nearest _navigation.inc.php file will be used by default
  $NAVIGATION = true;

  // Stuff that goes at the top of the page (in the <head>) (i.e. <link> tags)
  $HEAD = '
    <link rel="stylesheet" href="/css/event.css"/>
    <style>
      .origin-pin-view-example {
        width: 210px;
        height: 310px;
      }
    </style>
  ';

  // Stuff that goes at the bottom of the page (i.e. <script> tags)
  $FOOT = '
    <script src="/js/classes.js"></script>
    <script src="OriginPinViewExample.js"></script>
  ';

  include 'template.inc.php';
}
?>

<div class="origin-pin-view-example"></div>
