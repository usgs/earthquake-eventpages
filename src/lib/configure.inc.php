<?php

if (!function_exists('configure')) {
	function configure ($prompt, $default = null, $secure = false) {

		echo $prompt;
		if ($default != null) {
			echo ' [' . $default . ']';
		}
		echo ': ';

		if ($secure) {
			system('stty -echo');
		}

		$answer = trim(fgets(STDIN));

		if ($answer == '') {
			$answer = $default;
		}

		if ($secure) {
			system('stty echo');
			echo "\n";
		}

		return $answer;
	}
}

// This script should only be included by the pre-install.php script. The
// calling script is responsible for defining the $CONFIG_FILE_INI and calling
// date_default_timezone_set prior to including this configuration script.

$CONFIG = array();
if (file_exists($CONFIG_FILE_INI)) {
	$answer = configure('A previous configuration exists. ' .
			'Would you like to use it as defaults?', 'Y|n', false);

	if (strtoupper(substr($answer, 0, 1)) == 'Y') {
		$CONFIG = parse_ini_file($CONFIG_FILE_INI);
		print_r($CONFIG);
	}

	$answer = configure('Would you like to save the old configuration file?',
			'Y|n', false);

	if (strtoupper(substr($answer, 0, 1)) == 'Y') {
		$BAK_CONFIG_FILE = $CONFIG_FILE_INI . '.' . date('YmdHis');
		rename($CONFIG_FILE_INI, $BAK_CONFIG_FILE);
		echo 'Old configuration saved to file: ' . basename($BAK_CONFIG_FILE) .
				"\n";
	}
}

$FP_CONFIG = fopen($CONFIG_FILE_INI, 'w');
fwrite($FP_CONFIG, ';; auto generated: ' . date('r') . "\n\n");

// This data structure allows for simple configuration prompts
$prompts = array(
	// 'key' => array(
	// 	'prompt' => String,  // Prompt to request value from user
	// 	'default' => String, // Value to use if input is empty
	//  'secure' => Boolean  // True if input should not be echo'd to console
	// )

	'MOUNT_PATH' => array(
		'prompt' => 'URL Path for application',
		'default' => '/event',
		'secure' => false
	),

	'SERVICE_STUB' => array(
		'prompt' => 'URL stub for event detail GEOJSON web service',
		'default' => '/earthquakes/eventpage/%s.geojson',
		'secure' => false
	),

	'ATOM_STUB' => array(
		'prompt' => 'URL stub for event detail ATOM web service',
		'default' => '/earthquakes/eventpage/%s.xml',
		'secure' => false
	)
);

foreach ($prompts as $key => $item) {
	$default = null;
	if (isset($CONFIG[$key])) {
		$default = $CONFIG[$key];
	} else if (isset($item['default'])) {
		$default = $item['default'];
	}

	fwrite($FP_CONFIG, $key . ' = "' .
			configure($item['prompt'], $default, isset($item['secure']) ? $item['secure'] : false) .
			"\"\n");
}

// Do any custom prompting here


// Close the file
fclose($FP_CONFIG);
