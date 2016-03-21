<?php
if (!isset($TEMPLATE)) {

  $TITLE = 'BeachBallView';

  // If you want to include section navigation.
  // The nearest _navigation.inc.php file will be used by default
  $NAVIGATION = true;

  // Stuff that goes at the top of the page (in the <head>) (i.e. <link> tags)
  $HEAD = '
    <link rel="stylesheet" href="/css/event.css"/>
  ';

  // Stuff that goes at the bottom of the page (i.e. <script> tags)
  $FOOT = '
    <script src="/js/classes.js"></script>
    <script src="BeachBallViewExample.js"></script>
  ';

  include 'template.inc.php';
}
?>

<div class="row">
  <div class="column one-of-two">
    <h2>Actual</h2>
    <div id="beachballview-example"></div>
  </div>
  <div class="column one-of-two">
    <h2>Expected</h2>
    <img src="expected.png" alt="expected rendering of moment tensor"/>
  </div>
</div>
