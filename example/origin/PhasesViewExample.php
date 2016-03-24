<?php
if (!isset($TEMPLATE)) {

  $TITLE = 'PhasesView';

  // If you want to include section navigation.
  // The nearest _navigation.inc.php file will be used by default
  $NAVIGATION = true;

  // Stuff that goes at the top of the page (in the <head>) (i.e. <link> tags)
  $HEAD = '
    <link rel="stylesheet" href="/css/event.css"/>
    <style>
      #phases-view-example {
        /* Just some styles to mimic how view will look in tab list */
        border: 1px solid #ddd;
        padding: 0 1em 1em;
      }
  }
    </style>
  ';

  // Stuff that goes at the bottom of the page (i.e. <script> tags)
  $FOOT = '
    <script src="/js/classes.js"></script>
    <script src="PhasesViewExample.js"></script>
  ';

  include 'template.inc.php';
}
?>

<div id="phases-view-example"></div>
