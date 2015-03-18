'use strict';


var MMI_ARRAY = ['I', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII',
    'IX', 'X', 'XI', 'XII'];

var MMI_COLORS = [
  '#FFFFFF',  // I
  '#FFFFFF',  // I
  '#ACD8E9',  // II
  '#ACD8E9',  // III
  '#83D0DA',  // IV
  '#7BC87F',  // V
  '#F9F518',  // VI
  '#FAC611',  // VII
  '#FA8A11',  // VIII
  '#F7100C',  // IX
  '#C80F0A',  // X
  '#C80F0A',  // XI
  '#C80F0A'   // XII
];


var translateMmi = function (mmi) {
  mmi = Math.round(mmi);

  return MMI_ARRAY[mmi] || '';
};


var getMmiColor = function (mmi) {
  mmi = Math.round(mmi);
  return MMI_COLORS[mmi] || null;
};


var sortByDistance = function (a, b) {
  return parseFloat(a.properties.distance) - parseFloat(b.properties.distance);
};

/**
 * Converts XML into JSON
 *
 * @param  {object} xml,
 *         xml object returned by XHR response
 *
 * @return {object}
 *         JSON object returned
 */
var xmlToJson = function (xml) {
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
      nodeValue = xmlToJson(node);
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
};


var ImpactUtil = {
  translateMmi: translateMmi,
  getMmiColor: getMmiColor,
  sortByDistance: sortByDistance,
  xmlToJson: xmlToJson
};


module.exports = ImpactUtil;
