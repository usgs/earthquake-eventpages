<?php
if (!isset($TEMPLATE)) {

  $TITLE = 'Examples Index';

  // If you want to include section navigation.
  // The nearest _navigation.inc.php file will be used by default
  $NAVIGATION = true;

  include 'template.inc.php';
}
?>

<div class="site-sectionnav">
<?php print $NAVIGATION; ?>
</div>
