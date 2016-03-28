<?php

date_default_timezone_set('UTC');

$CONFIG_INI_FILE = dirname(__FILE__) . '/config.ini';
if (!file_exists($CONFIG_INI_FILE)) {
  trigger_error('Application not configured. Run pre-install script.');
  exit(-1);
}

$CONFIG = parse_ini_file($CONFIG_INI_FILE);

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
