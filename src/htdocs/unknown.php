<?php
if (!isset($TEMPLATE)) {
  include_once 'functions.inc.php';

  // Defines the $CONFIG hash of configuration variables
  include_once '../conf/config.inc.php';

  $TITLE = 'Unknown Event';
  $NAVIGATION = navItem('#', 'Event Summary');

  $EVENT_CONFIG = array(
    'ATTRIBUTION_URL' => '',
    'DYFI_RESPONSE_URL' => $DYFI_RESPONSE_URL,
    'GEOSERVE_WS_URL' => $GEOSERVE_WS_URL,
    'MOUNT_PATH' => $MOUNT_PATH,
    'KML_STUB' => '',
    'SCENARIO_MODE' => $SCENARIO_MODE,

    'unknownEvent' => true,
    'defaultModule' => 'tellus'
  );

  $HEAD = '
    <link rel="stylesheet" href="/lib/leaflet-0.7.7/leaflet.css"/>
    <link rel="stylesheet" href="css/event.css"/>
  ';

  $FOOT =
    /* create event page with event details and config. */
    '<script>' .
      'var EventConfig = ' . json_encode($EVENT_CONFIG) . ';' .
      'var EventDetails = null;' .
    '</script>' .
    '<script src="/lib/leaflet-0.7.7/leaflet.js"></script>' .
    /* this script creates EventPage using EventConfig, EventDetails */
    '<script src="js/event.js"></script>';


  include_once 'template.inc.php';
}

// include skeleton for javascript
// TODO: noscript content?
?>

<header class="event-header clearfix"></header>
<section class="event-content"></section>
<footer class="event-footer"></footer>
