<?php
if (!isset($TEMPLATE)) {

  $TITLE = 'FocalMechanismPinView';

  // If you want to include section navigation.
  // The nearest _navigation.inc.php file will be used by default
  $NAVIGATION = true;

  // Stuff that goes at the top of the page (in the <head>) (i.e. <link> tags)
  $HEAD = '
    <link rel="stylesheet" href="/css/event.css"/>
    <style>
      .focal-mechanism-pin-view-example {
        height: 310px;
        margin-top: 1em;
        width: 210px;
      }
    </style>
  ';

  // Stuff that goes at the bottom of the page (i.e. <script> tags)
  $FOOT = '
    <script src="/js/classes.js"></script>
    <script src="FocalMechanismPinViewExample.js"></script>
  ';

  include 'template.inc.php';
}
?>

<div class="focal-mechanism-pin-view-example"></div>
