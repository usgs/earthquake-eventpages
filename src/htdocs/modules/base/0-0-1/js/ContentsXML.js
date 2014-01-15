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

	/**
	 * Format contents xml content as html.
	 *
	 *  file title (heading)
	 *  list of available formats to download
	 *  [figure with caption and image, for first format ending in JPG,GIF,PNG]
	 *
	 *  ...[additional file elements]
	 */
	ContentsXML.prototype.toHtml = function() {
		var buf = [],
		    contents = this.getContents(),
		    content,
		    i,
		    len;

		if (contents === null) {
			throw new Error('No contents to format');
		}

		buf.push('<section class="contentsxml">');
		for (i = 0, len = contents.length; i < len; i++) {
			content = this.formatContent(contents[i]);
			buf.push(content);
		}
		buf.push('</section>');

		return buf.join('');
	};

	/**
	 * Format one piece of content from a contentsxml file.
	 *
	 * @param content {Object} content to format.
	 * @return {String} html markup for content.
	 */
	ContentsXML.prototype.formatContent = function (content) {
		var buf = [],
		    title = content.title,
		    caption = content.caption,
		    formats = content.formats,
		    image = null,
		    i,
		    len,
		    format,
		    href,
		    type,
		    url,
		    size,
		    extension;

		buf.push('<section class="contentsxml-content">');
		// content title
		buf.push('<header><h1>', title, '</h1></header>');

		// list of available download formats
		buf.push('<ul class="downloads">');
		for (i = 0, len = formats.length; i < len; i++) {
			format = content.formats[i];
			href = format.href;
			type = format.type;
			url = format.url;
			size = format.length;

			// keep everything after first period
			extension = href.split('.');
			extension = extension[extension.length - 1].toUpperCase();

			if (image === null && type.indexOf('image/') === 0) {
				// display first image inline
				image = url;
			}

			buf.push('<li><a',
						' href="', url, '"',
						' title="', title, '"',
						'>',
							href, ' ', this._formatter.fileSize(size),
						'</a></li>');
		}
		buf.push('</ul>');

		// inline image content
		if (image !== null && (this._options.showImages !== false)) {
			buf.push('<figure>');
			if (caption !== null) {
				buf.push('<figcaption>', caption, '</figcaption>');
			}
			buf.push('<img src="', image, '" alt="', title, ' image"/>');
			buf.push('</figure>');
		}

		// class="contentsxml-content"
		buf.push('</section>');

		return buf.join('');
	};


	// return constructor
	return ContentsXML;
});
