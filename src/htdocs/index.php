<?php

// TODO :: Remove once wrapped in template
if (!function_exists('param')) {
	function param ($key, $default = null) {
		if (isset($_GET[$key])) {
			return $_GET[$key];
		} else if (isset($_POST[$key])) {
			return $_POST[$key];
		} else {
			return $default;
		}
	}
}

// TODO :: Make this configurable. FeedApp on realtime server must respond to
//         event detail queries.
$stub = 'http://earthquake.usgs.gov/earthquakes/eventpage/';
// TODO :: Move to a configuration file ?
date_default_timezone_set('UTC');
$ROMANS = array('I', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX',
		'X', 'XI', 'XII');

// TODO :: Move to a functions file ?
function format_coord ($value, $pos, $neg) {
	if ($value >= 0.0) {
		return number_format(round($value * 1000) / 1000, 3) . '&deg;' . $pos;
	} else {	
		return number_format(round($value * -1000) / 1000, 3) . '&deg;' . $neg;
	}
}
function prettySize ($size) {
	$s = intval($size);
	$sizes = array('B', 'KB', 'MB', 'GB');
	for ($i = 0; $i < count($sizes); $i++) {
		if ($s < pow(1024, $i+1)) {
			return intval($s / pow(1024, $i)) . $sizes[$i];
		} 
	}
}
function prettyDate ($stamp) {
	$s = intval(substr($stamp, 0, -3));
	return date('Y-m-d H:i:s', $s) . ' UTC';
}

$eventid = param('eventid');


$feed = file_get_contents($stub . $eventid . '.geojson');
$event = json_decode($feed, true);
$props = $event['properties'];
$geom = $event['geometry'];

$time = intval(substr($props['time'], 0, -3));
$utctime = date('Y-m-d H:i:s', $time);

?>
<!-- TODO :: Modify once wrapped in template -->
<!DOCTYPE html>
<html lang="en">
<head>
	<title><?php print $props['title']; ?></title>
	<meta charset="UTF-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

	<link rel="stylesheet" href="css/index.css"/>
</head>
<body class="nojs">
<h1><?php echo $props['title']; ?></h1>

<section class="event-page">
	<header class="event-header">
		<div>
			<span class="utc"><?php print $utctime; ?> UTC</span>
			<span class="location">
				<?php print format_coord($geom['coordinates'][1], 'N', 'S'); ?>
				<?php print format_coord($geom['coordinates'][0], 'E', 'W'); ?>
				<br/>
				<?php print number_format(round(floatval(
						$geom['coordinates'][2]) * 10) / 10, 1); ?> km depth
			</span>
		</div>

		<?php
			if ($props['tsunami'] == '1' || $props['alert'] != null ||
					$props['mmi'] != null || $props['cdi'] != null) {
		?>
		<div class="impact-bubbles">
		<?php
		if ($props['tsunami'] == '1') {
			echo '<a href="http://www.tsunami.gov/" title="Tsunami Warning Center" ' .
					'class="tsunami"><img src="images/logos/tsunami-wave-warning.jpg" ' .
					'alt="Tsunami Warning Center"/></a>';
		}

		if ($props['alert'] != null) {
			echo '<a href="#pager" title="PAGER estimated impact alert level" ' .
					'class="alertlevel pager-alertlevel-' . strtolower($props['alert']) .
					'">PAGER - <strong>' . strtoupper($props['alert']) . '</strong></a>';
		}

		if ($props['mmi'] != null) {
			$romanMMI = $ROMANS[round(floatval($props['mmi']))];
			echo '<a href="#shakemap" title="ShakeMap maximum estimated intensity" ' .
					'class="maxmmi mmi' . $romanMMI . '">ShakeMap - <strong ' .
					'class="roman">' . $romanMMI . '</strong></a>';
		}

		if ($props['cdi'] != null) {
			$romanCDI = $ROMANS[round(floatval($props['cdi']))];
			echo '<a href="#dyfi" title="Did You Feel It? maximum reported intensity ' .
					'(' . intval($props['felt']) . 'reports)" class="feltreports mmi' .
					$romanCDI . '">DYFI? - <strong class="roman">' . $romanCDI .
					'</strong></a>';
		}
		?>
		</div>
		<?php } /* endif (impact bubbles) */ ?>
	</header>

	<section class="event-content downloads">
		<h2>Downloads</h2>
		<dl class="tabular">
			<?php

				print
					'<dt class="header download-type row-start">Product</dt>' .
					'<dt class="header download-link row-start">Link</dt>' .
					'<dt class="header download-id row-start">ID</dt>';

				foreach ($props['products'] as $productType) {
					if (count($productType) === 0) { continue; }
					$product = $productType[0];
					$contents = $product['contents'];

					// TODO :: Do we want to do this?
					if (!isset($contents['contents.xml'])) { continue; }

					foreach ($contents as $file) {
						if (strpos($file['url'], 'contents.xml') !== false) { continue; }

						print
							'<dt class="download-type row-start">Product</dt>' .
							'<dd class="download-type">' .
								$product['type'] . ' (' . strtoupper($product['source']) . ')' .
							'</dd>' .

							'<dt class="download-link">Link</dt>' .
							'<dd class="download-link">' .
								'<a href="' . $file['url'] . '" title="Size: ' .
										prettySize($file['length']) . '  Last Modified: ' .
										prettyDate($file['lastModified']) . '">' .
									basename($file['url']) . ' (' . prettySize($file['length']) .
								')</a>' .
							'</dd>' .

							'<dt class="download-id">ID</dt>' .
							'<dd class="download-id">' .
								$product['properties']['eventsource'] .
								$product['properties']['eventsourcecode'] .
							'</dd>';
					}
				}
			?>
		</dl>
	</section>

	<footer class="event-footer">
		<!-- TODO :: ??? -->
	</footer>
</section>



<!-- TODO :: Move this to $FOOT once wrapped in template -->
<script>var FEED = <?php echo $feed; ?>;</script>
<script src="requirejs/require.js" data-main="js/index.js"></script>

<!-- TODO :: Remove from dist code. This is for live reload (dev) only -->
<script src="http://localhost:35729/livereload.js?snipver=1" type="text/javascript"></script>

<!-- TODO :: Remove once wrapped in template -->
</body>
</html>
