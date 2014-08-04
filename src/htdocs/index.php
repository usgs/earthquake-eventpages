<?php
if (!isset($TEMPLATE)) {
	include_once 'functions.inc.php';

	// Defines the $CONFIG hash of configuration variables
	include_once '../conf/config.inc.php';

	$eventid = param('eventid');

	if ($eventid == null) {
		header('HTTP/1.0 400 Bad Request');
		trigger_error('Missing required parameter "eventid".');
		exit(-1);
	}

	$STUB = $CONFIG['SERVICE_STUB'];
	$EVENT_FEED = file_get_contents(sprintf($STUB, $eventid));

	$replaceWith = 'url":"';
	$searchFor = $replaceWith . str_replace(parse_url(
			$STUB, PHP_URL_PATH), '', $STUB);
	$EVENT = json_decode(str_replace(
			$searchFor, $replaceWith, $EVENT_FEED), true);

	$PROPERTIES = $EVENT['properties'];
	$GEOMETRY = $EVENT['geometry'];

	$TITLE = $PROPERTIES['title'];
	$NAVIGATION = navItem('#', 'Event Summary');

	$EVENT_CONFIG = array(
		'KML_STUB' => isset($CONFIG['KML_STUB']) ? $CONFIG['KML_STUB'] : null,
		'MOUNT_PATH' => $CONFIG['MOUNT_PATH']
	);

	$HEAD = '
		<link rel="alternate" type="application/atom+xml" href="' .
				sprintf($CONFIG['ATOM_STUB'], $eventid) . '"/>
		<link rel="stylesheet" href="css/index.css"/>
	';

	$FOOT =
		/* Embed event details in an explicitly named define. */
		'<script>' .
			'define(\'EventDetails\', ' . json_encode($EVENT) . ');' .
			'define(\'EventConfig\', ' . json_encode($EVENT_CONFIG) . ');' .
		'</script>' .
		/* Now start the action in a separate JS file for cachability. */
		'<script src="js/index.js"></script>' .
		'<script src="http://localhost:35729/livereload.js?snipver=1"></script>';

	include_once 'template.inc.php';
}

include_once '../lib/inc/html.inc.php';
?>
