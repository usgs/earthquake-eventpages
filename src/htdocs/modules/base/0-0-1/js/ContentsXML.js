/* global define */
define([
	'util/Xhr',
	'base/Formatter'
], function (
	Xhr,
	Formatter
) {
	'use strict';

	// path to contents.xml in a product.
	var CONTENTS_XML_FILENAME = 'contents.xml';


	/**
	 * ContentsXML constructor.
	 *
	 * Either contents, or a product with contents to load, are required.
	 *
	 * @param options {Object}
	 * @param options.contents {Array<Object>}.
	 *        Pre-parsed contents.
	 * @param options.product {Object}
	 *        The product with contents.xml.
	 * @param options.callback {Function(ContentsXML, contents)}
	 *        Called after successfully loading.
	 *        Optional (but recommended).
	 * @param options.errback {Function(ContentsXML, Error, arguments)}
	 *        Called on ajax error.
	 *        Optional.
	 * @param options.formatter {Object}
	 *        Used to format file sizes.
	 *        Optional, default is 'base/Formatter'.fileSize()
	 * @param options.showImages {Boolean}
	 *        Add a figure for the first 'JPG', 'GIF', or 'PNG' format
	 *            of each content.
	 *        Optional, default true.
	 */
	var ContentsXML = function(options) {
		var _this = this,
		    product = options.product,
		    callback = options.callback || function () {},
		    errback = options.errback || function () {},
		    contentsXML;
		// save options for later
		this._options = options;
		this._formatter = options.formatter || new Formatter();
		this._contents = null;
		this._pages = null;
		// load from product
		contentsXML = product.contents[CONTENTS_XML_FILENAME];
		if (!contentsXML) {
			errback(this, new Error('product has no contents.xml content'));
			return;
		}
		Xhr.ajax({
			url: contentsXML.url,
			error: function () {
				errback(_this, new Error('xhr error'), arguments);
			},
			success: function (data, xhr) {
				_this.parse(xhr.responseXML);
				callback(_this);
			}
		});
	};


	/**
	 * Parse contents xml.
	 *
	 * @param xml {XMLDocument}
	 *        contents xml document.
	 */
	ContentsXML.prototype.parse = function (xml) {
		var files,
		    file,
		    i,
		    len;

		if (xml === null) {
			throw new Error('contents xml is null');
		}

		// parse file elements
		this._contents = [];
		files = xml.querySelectorAll('contents > file');
		for (i = 0, len = files.length; i < len; i++) {
			file = this._parseFile(files[i]);
			this._contents.push(file);
		}
	};

	/**
	 * Parse one contents xml file element.
	 *
	 * @throws {Error} when refid attribute is present.
	 * @return {Object} file information as object with keys:
	 *         id:
	 *         title:
	 *         caption:
	 *         formats: [{href:, type:, url:}]
	 */
	ContentsXML.prototype._parseFile = function (file) {
		// url information
		var product = this._options.product,
		    productContents = (product ? product.contents : {}),
		    id,
		    title,
		    caption,
		    formats,
		    els,
		    el,
		    i,
		    len,
		    href,
		    type,
		    content;

		if (file.getAttribute('refid')) {
			throw new Error('file element with refid');
		}

		// parse file attributes
		id = file.getAttribute('id');
		title = file.getAttribute('title');
		caption = file.getElementsByTagName('caption')[0];
		caption = (caption ? caption.textContent : null);
		formats = [];

		// parse file formats
		els = file.getElementsByTagName('format');
		for (i = 0, len = els.length; i < len; i++) {
			el = els[i];
			href = el.getAttribute('href');
			type = el.getAttribute('type');
			content = productContents[href];
			formats.push({
				href: href,
				type: type,
				url: content.url,
				length: content.length
			});
		}

		return {
			id: id,
			title: title,
			caption: caption,
			formats: formats
		};
	};

	/**
	 * Get all contents from contents xml.
	 *
	 * @return {Array<Object>} array of contents.
	 */
	ContentsXML.prototype.getContents = function () {
		return this._contents;
	};


	ContentsXML.prototype.getDownloads = function () {
		return this.toHtml({
			format: 'download'
		});
	};

	ContentsXML.prototype.getImages = function () {
		return this.toHtml({
			format: 'image'
		});
	};

	/**
	 * Format contents xml content as html.
	 *
	 *  file title (heading)
	 *  list of available formats to download
	 *  [figure with caption and image, for first format ending in JPG,GIF,PNG]
	 *
	 *  ...[additional file elements]
	 */
	ContentsXML.prototype.toHtml = function (options) {
		var buf = [],
		    contents = this.getContents(),
		    content,
		    i,
		    len,
		    format = (options === undefined || options.format === undefined ? 'image' : options.format);

		if (contents === null) {
			throw new Error('No contents to format');
		}

		buf.push('<section class="contentsxml">');
		for (i = 0, len = contents.length; i < len; i++) {
			content = contents[i];
			if (format === 'image') {
				buf.push(this._formatImageContent(content));
			} else if (format === 'download') {
				buf.push(this._formatDownloadContent(content));
			}
		}
		buf.push('</section>');

		return buf.join('');
	};

	/**
	 * Format one piece of content.
	 *
	 * @param content {Object}
	 *        content to format.
	 * @return {String} markup for content.
	 */
	ContentsXML.prototype._formatDownloadContent = function (content) {
		var formatBuf = [],
		    title,
		    caption,
		    formats,
		    format,
		    href,
		    type,
		    url,
		    size,
		    extension,
		    i,
		    len;

		title = content.title;
		caption = content.caption;
		formats = content.formats;
		for (i = 0, len = formats.length; i < len; i++) {
			format = formats[i];
			href = format.href;
			type = format.type;
			url = format.url;
			size = format.length;
			extension = href.split('.').slice(-1).join('').toUpperCase();

			formatBuf.push(['<a',
					' href="', url, '"',
					' title="', title,' ', extension, ' (', href, ')"',
					'>',
						extension, ' (', this._formatter.fileSize(size), ')',
					'</a>'].join(''));
		}

		return [
			'<section class="contentsxml-content">',
				'<header><h1>', title, '</h1></header>',
				'<ul class="formats">',
					'<li>', formatBuf.join('</li><li>'), '</li>',
				'</ul>',
			'</section>'
		].join('');
	};



	/**
	 * Format one piece of content.
	 *
	 * @param content {Object}
	 *        content to format.
	 * @return {String} markup for content.
	 */
	ContentsXML.prototype._formatImageContent = function (content) {
		var imageBuf = null,
		    title,
		    caption,
		    formats,
		    format,
		    href,
		    type,
		    url,
		    size,
		    extension,
		    i,
		    len;

		title = content.title;
		caption = content.caption;
		formats = content.formats;
		for (i = 0, len = formats.length; i < len; i++) {
			format = formats[i];
			href = format.href;
			type = format.type;
			url = format.url;
			size = format.length;
			extension = href.split('.').slice(-1).join('').toUpperCase();

			if (imageBuf === null && type.indexOf('image/') === 0) {
				imageBuf = [];
				imageBuf.push('<figure>',
						'<img src="', url, '" alt="', title, ' image"/>');
				if (caption) {
					imageBuf.push('<figcaption>', caption, '</figcaption>');
				}
				imageBuf.push('</figure>');

			}
		}

		// Only _formatDownloadContent captures non-image content
		if (imageBuf === null) {
			return;
		}

			return [
			'<section class="contentsxml-content">',
				'<header><h1>', title, '</h1></header>',
				(imageBuf ? imageBuf.join('') : ''),
			'</section>'
		].join('');
	};

	// return constructor
	return ContentsXML;
});
