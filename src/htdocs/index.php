<?php
if (!isset($TEMPLATE)) {
	// Defines the $CONFIG hash of configuration variables
	include_once '../conf/config.inc.php';

	$eventid = param('eventid');
	$format = param('format', 'html');
	$output_format = $CONFIG['LIB_DIR'] . '/formats/' . $format . '.inc.php';

	if ($eventid == null) {
		// TODO :: HTTP headers?
		trigger_error('Missing required parameter "eventid".');
		exit(-1);
	}

	$event = json_decode(
		file_get_contents(sprintf($CONFIG['SERVICE_STUB'], $eventid)),
		true // Parse to an associative array rather than an object
	);

	//<!-- TODO :: Remove from dist code. This is for live reload (dev) only -->
	//<script src="http://localhost:35729/livereload.js?snipver=1" type="text/javascript"></script>

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


	include_once 'template.inc.php';
}
?>
<section class="event-page">
	<header class="event-header clearfix">
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
		<div class="impact-bubbles clearfix">
		<?php
		if ($props['tsunami'] == '1') {
			echo '<a href="http://www.tsunami.gov/" title="Tsunami Warning Center" ' .
					'class="tsunami"><img src="images/logos/tsunami-wave-warning.jpg" ' .
					'alt="Tsunami Warning Center"/></a> ';
		}

		if ($props['alert'] != null) {
			echo '<a href="#pager" title="PAGER estimated impact alert level" ' .
					'class="pager-alertlevel-' . strtolower($props['alert']) .
					'">PAGER - <strong>' . strtoupper($props['alert']) . '</strong></a> ';
		}

		if ($props['mmi'] != null) {
			$romanMMI = $ROMANS[round(floatval($props['mmi']))];
			echo '<a href="#shakemap" title="ShakeMap maximum estimated intensity" ' .
					'class="mmi' . $romanMMI . '">ShakeMap - <strong ' .
					'class="roman">' . $romanMMI . '</strong></a> ';
		}

		if ($props['cdi'] != null) {
			$romanCDI = $ROMANS[round(floatval($props['cdi']))];
			echo '<a href="#dyfi" title="Did You Feel It? maximum reported intensity ' .
					'(' . intval($props['felt']) . 'reports)" class="mmi' .
					$romanCDI . '">DYFI? - <strong class="roman">' . $romanCDI .
					'</strong></a>';
		}
		?>
		</div>
		<?php } /* endif (impact bubbles) */ ?>
	</header>

	<section class="event-content downloads">
		<h2>Downloads</h2>
		<dl>
			<?php

				foreach ($props['products'] as $productType) {
					if (count($productType) === 0) { continue; }
					$product = $productType[0];
					$contents = $product['contents'];

					// TODO :: Do we want to do this?
					if (!isset($contents['contents.xml'])) { continue; }

					// Skip if product does not specify links (other than contents.xml)
					if (count($contents) == 0) { continue; }

					print
						'<dt>' .
							$product['type'] . ' (' . strtoupper($product['source']) . ') ' .
							$product['properties']['eventsource'] .
							$product['properties']['eventsourcecode'] .
						'</dt>' .
						'<dd><ul>'
						;

					foreach ($contents as $file) {
						if (strpos($file['url'], 'contents.xml') !== false) { continue; }

						print
							'<li>' .
								'<a href="' . $file['url'] . '" title="Size: ' .
										prettySize($file['length']) . '  Last Modified: ' .
										prettyDate($file['lastModified']) . '">' .
									basename($file['url']) . ' (' . prettySize($file['length']) .
								')</a>' .
							'</li>'
							;
					}

					print '</ul></dd>';
				}
			?>
		</dl>
	</section>

	<footer class="event-footer">
		<!-- TODO :: ??? -->
	</footer>
</section>
