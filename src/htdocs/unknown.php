<?php
if (!isset($TEMPLATE)) {
  include_once 'functions.inc.php';

  // Defines the $CONFIG hash of configuration variables
  include_once '../conf/config.inc.php';

  $TITLE = 'Unknown Event';
  $NAVIGATION = navItem('#', 'Event Summary');

  $EVENT_CONFIG = array(
    'KML_STUB' => null,
    'MOUNT_PATH' => $CONFIG['MOUNT_PATH'],
    'DYFI_RESPONSE_URL' => $CONFIG['DYFI_RESPONSE_URL']
  );

  $HEAD = '<link rel="stylesheet" href="css/index.css"/>';

  $FOOT =
    /* create event page with event details and config. */
    '<script>' .
      'var EventConfig = ' . json_encode($EVENT_CONFIG) . ';' .
      'var EventDetails = null;' .
    '</script>' .
    /* this script creates EventPage using EventConfig, EventDetails */
    '<script src="js/index.js"></script>';


  include_once 'template.inc.php';
}

// include skeleton for javascript
// TODO: noscript content?
?>

<header class="event-header clearfix"></header>
<section class="event-content"></section>
<footer class="event-footer"></footer>
