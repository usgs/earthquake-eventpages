<?php
if (!isset($TEMPLATE)) {
	include_once 'functions.inc.php';

	// Defines the $CONFIG hash of configuration variables
	include_once '../conf/config.inc.php';

	$eventid = param('eventid');
	$format = param('format', 'html');
	$output_format = $CONFIG['LIB_DIR'] . '/formats/' . $format . '.inc.php';

	if ($eventid == null) {
		header('HTTP/1.0 400 Bad Request');
		trigger_error('Missing required parameter "eventid".');
		exit(-1);
	}

	$EVENT_FEED = file_get_contents(sprintf($CONFIG['SERVICE_STUB'], $eventid));
	$EVENT = json_decode($EVENT_FEED, true);

	$PROPERTIES = $EVENT['properties'];
	$GEOMETRY = $EVENT['geometry'];

	$TITLE = $PROPERTIES['title'];
	$NAVIGATION = navItem('#', 'Event Summary');

	$HEAD = '
		<link rel="alternate" type="application/atom+xml" href="' .
				sprintf($CONFIG['ATOM_STUB'], $eventid) . '"/>
		<link rel="stylesheet" href="css/index.css"/>
	';

	$FOOT = '
		<script src="requirejs/require.js"></script>
		<script src="http://localhost:35729/livereload.js?snipver=1"></script>
	';

	ob_start();
	include_once 'js/index.js.php';
	$FOOT .= ob_get_clean();

	include_once 'template.inc.php';
}

include_once '../lib/inc/html.inc.php';
?>
