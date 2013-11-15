<?php
	/**
	 * This "Javascript" is included in-line by index.php. It inlines the
	 * EVENT object as a parameter to the EventPage. This removes the need for
	 * a global EVENT_FEED object.
	 */
?>
<script>
require.config({
	baseUrl: 'modules',
	paths: {
		mvc: '/hazdev-webutils/src/mvc',
		util: '/hazdev-webutils/src/util',

		base: 'base/0-0-1/js'
	},
	shim: {
	}
});

require([
	'base/EventPage',
	'base/EventModule'
], function (
	EventPage,
	EventModule
) {
	'use strict';

	new EventPage({
		container: document.querySelector('.event-content'),
		navigation: document.querySelector('.site-sectionnav'),
		eventDetails: <?php print json_encode($EVENT); ?>,
		modules: [
			new EventModule({
				stub: 'shakemap',
				displayText: 'ShakeMap',
				pages: [
					{
						classname: 'base/EventModulePage',
						options: {
							href: 'intensity',
							displayText: 'Intensity Maps'
						}
					},
					{
						classname: 'base/EventModulePage',
						options: {
							href: 'stations',
							displayText: 'Station Maps'
						}
					},
					{
						classname: 'base/EventModulePage',
						options: {
							href: 'pga',
							displayText: 'PGA Maps'
						}
					},
					{
						classname: 'base/EventModulePage',
						options: {
							href: 'pgv',
							displayText: 'PGV Maps'
						}
					}
				]
			})
		]
	});
});
</script>
