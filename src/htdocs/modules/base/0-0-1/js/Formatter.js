/* global define */
define([], function () {
	'use strict';

	// size abbreviations for [bytes, kilobytes, megabytes, gigabytes]
	var FILE_SIZES = [' b', ' Kb', ' Mb', ' Gb'];

	/**
	 * Construct a new Formatter.
	 *
	 * @param options {Object}
	 *        formatter options.
	 */
	var Formatter = function (options) {
		this.options = options;
	};


	/**
	 * Format file size using human friendly sizes.
	 *
	 * @param bytes a number of bytes to format.
	 * @return formatted string.
	 */
	Formatter.prototype.fileSize = function (bytes) {
		var sizeIndex = 0;

		bytes = +bytes;
		while (bytes >= 1024) {
			bytes = bytes / 1024;
			sizeIndex++;
		}
		if (sizeIndex > 1) {
			bytes = bytes.toFixed(1);
		} else {
			bytes = bytes.toFixed(0);
		}
		return bytes + FILE_SIZES[sizeIndex];
	};


	// return constructor
	return Formatter;
});
