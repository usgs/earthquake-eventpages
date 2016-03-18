<?php
if (!isset($TEMPLATE)) {

  $TITLE = 'InteractiveMapView';

  // If you want to include section navigation.
  // The nearest _navigation.inc.php file will be used by default
  $NAVIGATION = true;

  // Stuff that goes at the top of the page (in the <head>) (i.e. <link> tags)
  $HEAD = '
    <style>
      #interactivemap-view-example {
        width: 100%;
        height: 100%;
        min-height: 500px;
      }
    </style>
    <link rel="stylesheet" href="/lib/leaflet-0.7.7/leaflet.css"/>
    <link rel="stylesheet" href="/css/event.css"/>
  ';

  // Stuff that goes at the bottom of the page (i.e. <script> tags)
  $FOOT = '
    <script src="/lib/leaflet-0.7.7/leaflet.js"></script>
    <script src="/js/classes.js"></script>
    <script src="InteractiveMapViewExample.js"></script>
  ';

  include 'template.inc.php';
}
?>

<div id="interactivemap-view-example"></div>
