/* global define */
define([],
function () {
  'use strict';

  var ImpactUtil;

  ImpactUtil = {

    _translateMmi: function (mmi) {
      var mmiArray = ['I', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII',
          'IX', 'X', 'XI', 'XII'];
      mmi = Math.round(mmi);

      return mmiArray[mmi] || '';
    },

    _sortByDistance: function (a, b) {
      return parseFloat(a.dist) - parseFloat(b.dist);
    },

  /**
   * Converts XML into JSON
   *
   * @param  {object} xml,
   *         xml object returned by XHR response
   *
   * @return {object}
   *         JSON object returned
   */
    _xmlToJson: function (xml) {
      // based on http://davidwalsh.name/convert-xml-json
      var obj = {},
          children = [],
          attrs,
          attr,
          nodes,
          node,
          nodeName,
          nodeValue,
          i,
          len;

      if (xml.nodeType === 3) {
        return xml.nodeValue;
      }

      if (xml.nodeType === 1) {
        attrs = xml.attributes;
        for (i = 0, len = attrs.length; i < len; i++) {
          attr = attrs.item(i);
          obj[attr.nodeName] = attr.nodeValue;
        }
      }

      if (xml.hasChildNodes()) {
        nodes = xml.childNodes;
        for(i = 0, len = nodes.length; i < len; i++) {
          node = nodes.item(i);
          nodeName = node.nodeName;
          nodeValue = this._xmlToJson(node);
          children.push(nodeValue);
          if (typeof(obj[nodeName]) === 'undefined') {
            obj[nodeName] = nodeValue;
          } else {
            if (typeof(obj[nodeName].push) === 'undefined') {
              obj[nodeName] = [obj[nodeName]];
            }
            obj[nodeName].push(nodeValue);
          }
        }
      }

      // clean up '#text' nodes
      if (children.length === 1 && obj['#text']) {
        return obj['#text'];
      } else if (obj['#text']) {
        delete obj['#text'];
      }

      return obj;
    }
  };

  return ImpactUtil;
});
