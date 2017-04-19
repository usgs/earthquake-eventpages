<?php
if (!isset($TEMPLATE)) {

  $TITLE = 'TextProductPinView';

  // If you want to include section navigation.
  // The nearest _navigation.inc.php file will be used by default
  $NAVIGATION = true;

  // Stuff that goes at the top of the page (in the <head>) (i.e. <link> tags)
  $HEAD = '
    <link rel="stylesheet" href="/css/event.css"/>
    <style>
      .text-product-pin-view-example-general-text,
      .text-product-pin-view-example-impact-text,
      .text-product-pin-view-example-scitech-text {
        width: 420px;
        height: 310px;
        margin: 1em 0 0;
        max-width: 100%;
      }
    </style>
  ';

  // Stuff that goes at the bottom of the page (i.e. <script> tags)
  $FOOT = '
    <script src="/js/classes.js"></script>
    <script src="TextProductPinViewExample.js"></script>
  ';

  include 'template.inc.php';
}
?>

<div class="text-product-pin-view-example-general-text"></div>
<div class="text-product-pin-view-example-impact-text"></div>
<div class="text-product-pin-view-example-scitech-text"></div>
