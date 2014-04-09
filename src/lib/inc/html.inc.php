<?php
	include_once 'formatfuncs.inc.php';

	$ROMANS = array('I', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX',
	'X', 'XI', 'XII');

	$utctime = date('Y-m-d H:i:s', intval(substr($PROPERTIES['time'], 0, -3)));
?>

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
				'class="tsunami"><img src="images/logos/tsunami.jpg" ' .
				'alt="Tsunami Warning Center"/></a> ';
	}
	if ($PROPERTIES['cdi'] != null) {
		$romanCDI = $ROMANS[round(floatval($PROPERTIES['cdi']))];
		echo '<a href="#dyfi" title="Did You Feel It? maximum reported intensity ' .
				'(' . intval($PROPERTIES['felt']) . 'reports)" class="mmi' .
				$romanCDI . '">DYFI? - <strong class="roman">' . $romanCDI .
				'</strong></a>';
	}

	if ($PROPERTIES['mmi'] != null) {
		$romanMMI = $ROMANS[round(floatval($PROPERTIES['mmi']))];
		echo '<a href="#shakemap" title="ShakeMap maximum estimated intensity" ' .
				'class="mmi' . $romanMMI . '">ShakeMap - <strong ' .
				'class="roman">' . $romanMMI . '</strong></a> ';
	}

	if ($PROPERTIES['alert'] != null) {
		echo '<a href="#pager" title="PAGER estimated impact alert level" ' .
				'class="pager-alertlevel-' . strtolower($PROPERTIES['alert']) .
				'">PAGER - <strong>' . strtoupper($PROPERTIES['alert']) .
				'</strong></a> ';
	}

	?>
	</div>
	<?php } /* endif (impact bubbles) */ ?>
</header>

<section class="event-content">
	<div class="downloads">
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
							$product['type'] . ' (' . strtoupper($product['source']) .
							') ' . $product['properties']['eventsource'] .
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
									basename($file['url']) . ' (' .
											prettySize($file['length']) .
								')</a>' .
							'</li>'
							;
					}

					print '</ul></dd>';
				}
			?>
		</dl>
</div>
</section>

<footer class="event-footer">
	<!-- TODO :: ??? -->
</footer>
