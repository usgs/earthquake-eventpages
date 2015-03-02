<?php
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
?>
