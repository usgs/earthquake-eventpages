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
		defaultPage: 'shakemap_intensity',
		container: document.querySelector('.event-content'),
		navigation: document.querySelector('.site-sectionnav'),
		eventDetails: <?php print json_encode($EVENT); ?>,
		modules: [
			{
				className: 'base/EventModule',
				options: {
					stub: 'shakemap',
					title: 'ShakeMap',
					pages: [
						{
							className: 'base/EventModulePage',
							options: {
								stub: 'intensity',
								title: 'Intensity Maps'
							}
						},
						{
							className: 'base/EventModulePage',
							options: {
								stub: 'stations',
								title: 'Station Maps'
							}
						},
						{
							className: 'base/EventModulePage',
							options: {
								stub: 'pga',
								title: 'PGA Maps'
							}
						},
						{
							className: 'base/EventModulePage',
							options: {
								stub: 'pgv',
								title: 'PGV Maps'
							}
						}
					]
				}
			}
		]
	});
});
</script>
