<?php include_once 'formatfuncs.inc.php'; ?>

<header class="event-header clearfix">
  <span class="event-datetime">
    <?php print prettyDate($PROPERTIES['time']); ?>
  </span>
  <span class="event-coordinates">
    <?php $coordinates = $GEOMETRY['coordinates']; ?>
    <?php print format_coord($coordinates[1], 'N', 'S'); ?>
    &nbsp;
    <?php print format_coord($coordinates[0], 'E', 'W'); ?>
  </span>
  <span class="event-depth">
  <?php
    print isset($coordinates[2]) ?
      number_format(round(floatval($coordinates[2]) * 10) / 10, 1) :
      '?';
  ?> km depth
  </span>
  <?php if ($EVENT_CONFIG['SCENARIO_MODE'] == true) { ?>
    <div class="alert warning">
      This event is a scenario (it did not occur) and should only be used for
      planning purposes.
      <br/>
      <a href="/scenarios/">More information about scenarios</a>
    </div>
  <?php } /* END :: SCENARIO_MODE */ ?>
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

<footer class="event-footer"></footer>
