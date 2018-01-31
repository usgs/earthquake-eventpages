<?php

date_default_timezone_set('UTC');

$CONFIG_INI_FILE = dirname(__FILE__) . '/config.ini';
if (!file_exists($CONFIG_INI_FILE)) {
  trigger_error('Application not configured. Run pre-install script.');
  exit(-1);
}

$CONFIG = parse_ini_file($CONFIG_INI_FILE);
$CONFIG = array_merge($CONFIG, $_ENV);

$ATTRIBUTION_URL = isset($CONFIG['ATTRIBUTION_URL']) ?
    $CONFIG['ATTRIBUTION_URL'] : null;
$DYFI_RESPONSE_URL = isset($CONFIG['DYFI_RESPONSE_URL']) ?
    $CONFIG['DYFI_RESPONSE_URL'] : null;
$GEOSERVE_WS_URL = isset($CONFIG['GEOSERVE_WS_URL']) ?
    $CONFIG['GEOSERVE_WS_URL'] : null;
$MOUNT_PATH = isset($CONFIG['MOUNT_PATH']) ?
    $CONFIG['MOUNT_PATH'] : null;
$KML_STUB = isset($CONFIG['KML_STUB']) ?
        $CONFIG['KML_STUB'] : null;

$SCENARIO_MODE = false;
if (isset($CONFIG['INSTALLATION_TYPE']) &&
    strcasecmp($CONFIG['INSTALLATION_TYPE'], 'scenario') === 0) {
    $SCENARIO_MODE = true;
}

// build absolute Event Page URL string
$forwarded_https = (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) &&
    $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https');
$server_protocol =
    (
      (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'Off')
      || $forwarded_https
    ) ? 'https://' : 'http://';
$server_host = isset($_SERVER['HTTP_HOST']) ?
    $_SERVER['HTTP_HOST'] : "earthquake.usgs.gov";
$server_port = isset($_SERVER['SERVER_PORT']) ? $_SERVER['SERVER_PORT'] : 80;
$server_uri = $_SERVER['REQUEST_URI'];

$HOST_URL_PREFIX = $server_protocol . $server_host;
if ( ($server_port == 80 && ($server_protocol == 'http://' || $forwarded_https))
    || ($server_port == 443 && $server_protocol == 'https://') ) {
  // don't need port
} else {
  // if a port is specified in the HTTP_HOST, don't use twice (ex: localhost:8080, perhaps used in port forwarding)
  if(!strpos($server_host, ':')) {
    $HOST_URL_PREFIX .= ':' . $server_port;
  }
}
