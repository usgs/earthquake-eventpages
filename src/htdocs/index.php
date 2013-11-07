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
		<link rel="stylesheet" href=""
	';
	$FOOT = '
		<script src="requirejs/require.js"></script>
		<script src="http://localhost:35729/livereload.js?snipver=1"></script>
	';

	ob_start();
	include_once 'js/index.js.php';
	$FOOT .= ob_get_clean();

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

	$utctime = date('Y-m-d H:i:s', intval(substr($PROPERTIES['time'], 0, -3)));

	include_once 'template.inc.php';
}
?>
<section class="event-page">
	<header class="event-header clearfix">
		<div>
			<span class="utc"><?php print $utctime; ?> UTC</span>
			<span class="location">
				<?php print format_coord($GEOMETRY['coordinates'][1], 'N', 'S'); ?>
				<?php print format_coord($GEOMETRY['coordinates'][0], 'E', 'W'); ?>
				<br/>
				<?php print number_format(round(floatval(
						$GEOMETRY['coordinates'][2]) * 10) / 10, 1); ?> km depth
			</span>
		</div>

		<?php
			if ($PROPERTIES['tsunami'] == '1' || $PROPERTIES['alert'] != null ||
					$PROPERTIES['mmi'] != null || $PROPERTIES['cdi'] != null) {
		?>
		<div class="impact-bubbles clearfix">
		<?php
		if ($PROPERTIES['tsunami'] == '1') {
			echo '<a href="http://www.tsunami.gov/" title="Tsunami Warning Center" ' .
					'class="tsunami"><img src="images/logos/tsunami-wave-warning.jpg" ' .
					'alt="Tsunami Warning Center"/></a> ';
		}

		if ($PROPERTIES['alert'] != null) {
			echo '<a href="#pager" title="PAGER estimated impact alert level" ' .
					'class="pager-alertlevel-' . strtolower($PROPERTIES['alert']) .
					'">PAGER - <strong>' . strtoupper($PROPERTIES['alert']) . '</strong></a> ';
		}

		if ($PROPERTIES['mmi'] != null) {
			$romanMMI = $ROMANS[round(floatval($PROPERTIES['mmi']))];
			echo '<a href="#shakemap" title="ShakeMap maximum estimated intensity" ' .
					'class="mmi' . $romanMMI . '">ShakeMap - <strong ' .
					'class="roman">' . $romanMMI . '</strong></a> ';
		}

		if ($PROPERTIES['cdi'] != null) {
			$romanCDI = $ROMANS[round(floatval($PROPERTIES['cdi']))];
			echo '<a href="#dyfi" title="Did You Feel It? maximum reported intensity ' .
					'(' . intval($PROPERTIES['felt']) . 'reports)" class="mmi' .
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

				foreach ($PROPERTIES['products'] as $productType) {
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
