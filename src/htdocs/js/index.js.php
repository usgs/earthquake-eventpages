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
		util: '/hazdev-webutils/src/util'
	},
	shim: {
	}
});

require([
	'base/0-0-1/EventPage',
	'base/0-0-1/EventModule'
], function (
	EventPage,
	EventModule
) {
	'use strict';

	new EventPage({
		container: document.querySelector('.event-content'),
		navigation: document.querySelector('.site-sectionnav'),
		eventDetails: <?php print json_encode($EVENT); ?>,
		modules: {
			'shakemap': new EventModule({
				displayText: 'ShakeMap',
				pages: [
					{
						classname: 'base/0-0-1/EventModulePage',
						options: {
							href: 'intensity',
							displayText: 'Intensity Maps'
						}
					},
					{
						classname: 'base/0-0-1/EventModulePage',
						options: {
							href: 'stations',
							displayText: 'Station Maps'
						}
					},
					{
						classname: 'base/0-0-1/EventModulePage',
						options: {
							href: 'pga',
							displayText: 'PGA Maps'
						}
					},
					{
						classname: 'base/0-0-1/EventModulePage',
						options: {
							href: 'pgv',
							displayText: 'PGV Maps'
						}
					}
				]
			})
		}
	});
});
</script>
