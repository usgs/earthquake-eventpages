<?php
if (!isset($TEMPLATE)) {
  include_once 'functions.inc.php';

  // Defines the $CONFIG hash of configuration variables
  include_once '../conf/config.inc.php';

  $HEAD = '
    <link rel="stylesheet" href="/lib/leaflet-0.7.7/leaflet.css"/>
    <link rel="stylesheet" href="css/event.css"/>' .

    '<meta property="og:image" content="' . $HOST_URL_PREFIX .
        $MOUNT_PATH . '/images/logos/usgs-logo-facebook.jpg"/>' .
    '<meta property="og:image:height" content="630"/>' .
    '<meta property="og:image:width" content="1200"/>';

  $eventid = param('eventid');

  if ($eventid == null) {
    header('HTTP/1.0 400 Bad Request');
    trigger_error('Missing required parameter "eventid".');
    exit(-1);
  }

  if (isset($CONFIG['OFFSITE_HOST']) && $CONFIG['OFFSITE_HOST'] != '') {
    $OFFSITE_HOST = 'https://' . $CONFIG['OFFSITE_HOST'];
  } else {
    $OFFSITE_HOST = 'https://' . $_SERVER['HTTP_HOST'];
  }

  $STUB = $OFFSITE_HOST . $CONFIG['DETAILS_STUB'];

  $ch = curl_init(sprintf($STUB, $eventid));
  curl_setopt_array($ch, array(
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_RETURNTRANSFER => true));
  $EVENT_FEED = curl_exec($ch);
  $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

  if ($httpCode !== 200) {
    // cache "error" for 1 minute
    $now = time();
    $maxAge = 60;
    header('Cache-Control: max-age=' . $maxAge);
    header('Expires: ' . gmdate('D, d M Y H:i:s \G\M\T', $now + $maxAge));
    header('Last-Modified: ' . gmdate('D, d M Y H:i:s \G\M\T', $now));

    if ($httpCode === 404 || $httpCode === 204) {
      // event not found
      header('HTTP/1.0 404 Not Found');
    } else if ($httpCode === 409) {
      header('HTTP/1.0 410 Gone');
      $TITLE = 'Event Deleted';
      include_once 'template.inc.php';
    } else {
      // other, unexpected return
      header('HTTP/1.0 503 Service Unavailable');
      echo 'Unable to retrieve event information (' . $httpCode . ')';
    }
    exit(-1);
  }

  $replaceWith = 'url":"';
  $searchFor = $replaceWith . $OFFSITE_HOST;

  $EVENT = json_decode(str_replace(
      $searchFor, $replaceWith, $EVENT_FEED), true);

  $PROPERTIES = $EVENT['properties'];
  $GEOMETRY = $EVENT['geometry'];

  if ($PROPERTIES['net'] . $PROPERTIES['code'] !== $eventid) {
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ' . $PROPERTIES['url']);
  }

  $TITLE = $PROPERTIES['title'];
  $NAVIGATION = navItem('#', 'Event Summary');

  $EVENT_CONFIG = array(
    'ATTRIBUTION_URL' => $ATTRIBUTION_URL,
    'DYFI_RESPONSE_URL' => $DYFI_RESPONSE_URL,
    'GEOSERVE_WS_URL' => $GEOSERVE_WS_URL,
    'MOUNT_PATH' => $MOUNT_PATH,
    'KML_STUB' => $KML_STUB,
    'SCENARIO_MODE' => $SCENARIO_MODE
  );

  $FOOT =
    /* create event page with event details and config. */
    '<script>' .
      'var EventConfig = ' . json_encode($EVENT_CONFIG) . ';' .
      'var EventDetails = ' . json_encode($EVENT) . ';' .
    '</script>' .
    '<script src="/lib/leaflet-0.7.7/leaflet.js"></script>' .
    /* this script creates EventPage using EventConfig, EventDetails */
    '<script src="js/event.js"></script>';

  // cache control headers
  $now = time();
  $age = $now - ($PROPERTIES['time'] / 1000);
  if ($age <= 604800) {
    // past 7 days, cache for 1 minute
    $maxAge = 60;
  } else if ($age <= 2592000) {
    // past 30 days, cache for 15 minutes
    $maxAge = 900;
  } else {
    // older, cache for 1 day
    $maxAge = 86400;
  }
  header('Cache-Control: max-age=' . $maxAge);
  header('Expires: ' . gmdate('D, d M Y H:i:s \G\M\T', $now + $maxAge));
  header('Last-Modified: ' . gmdate('D, d M Y H:i:s \G\M\T', $now));

  include_once 'template.inc.php';
}

if ($httpCode != 409) {
  include_once '../lib/inc/html.inc.php';
} else {
  print '<p class="alert error">The requested event has been deleted.</p>';
}
?>
