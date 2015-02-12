<?php
  include_once 'formatfuncs.inc.php';

  $ROMANS = array('I', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX',
  'X', 'XI', 'XII');

  $utctime = date('Y-m-d H:i:s', intval(substr($PROPERTIES['time'], 0, -3)));
?>

<header class="event-header clearfix">
  <noscript class="event-time-location">
    <span class="utc"><?php print $utctime; ?> (UTC)</span>
    <span class="location">
      <?php
        $coordinates = $GEOMETRY['coordinates'];
        print format_coord($coordinates[1], 'N', 'S');
        print format_coord($coordinates[0], 'E', 'W');
      ?>
      <br/>
      <?php
        print isset($coordinates[2]) ?
          number_format(round(floatval($coordinates[2]) * 10) / 10, 1) :
          '?';
      ?> km depth
    </span>
  </noscript>

  <?php
    if ($PROPERTIES['tsunami'] === 1 || $PROPERTIES['alert'] !== null ||
        $PROPERTIES['mmi'] !== null || $PROPERTIES['cdi'] !== null) {
  ?>
  <div class="impact-bubbles clearfix">
  <?php

  if ($PROPERTIES['cdi'] !== null) {
    $romanCDI = $ROMANS[round(floatval($PROPERTIES['cdi']))];
    echo '<a href="#impact_dyfi" title="Did You Feel It? maximum reported intensity ' .
        '(' . intval($PROPERTIES['felt']) . 'reports)" class="mmi' .
        $romanCDI . '"><strong class="roman">' . $romanCDI .
        '</strong><br/><abbr title="Did You Feel It?">DYFI?</abbr></a>';
  }

  if ($PROPERTIES['mmi'] !== null) {
    $romanMMI = $ROMANS[round(floatval($PROPERTIES['mmi']))];
    echo '<a href="#impact_shakemap" title="ShakeMap maximum estimated intensity" ' .
        'class="mmi' . $romanMMI . '"><strong class="roman">' . $romanMMI .
        '</strong><br/><abbr title="ShakeMap">ShakeMap</abbr></a> ';
  }

  if ($PROPERTIES['alert'] !== null) {
    echo '<a href="#impact_pager" title="PAGER estimated impact alert level" ' .
        'class="pager-alertlevel-' . strtolower($PROPERTIES['alert']) .
        '"><strong class="roman">' . strtoupper($PROPERTIES['alert']) .
        '</strong><br/><abbr title="Prompt Assessment of Global Earthquakes for Response">PAGER</abbr></a> ';
  }

  if ($PROPERTIES['tsunami'] === 1) {
    echo '<a href="http://www.tsunami.gov/" title="Tsunami Warning Center" ' .
        'class="tsunami"><img src="images/logos/tsunami.jpg" ' .
        'alt="Tsunami Warning Center"/></a> ';
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
          if (count($contents) === 0) { continue; }

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
