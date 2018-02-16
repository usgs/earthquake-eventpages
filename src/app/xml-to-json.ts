  /**
   * Convert simple xml to a json object.
   *
   * Does not work well for mixed content (text/elements).
   *
   * @param xml
   *        an xml string, or Node.
   * @return parsed object.
   */
  export function xmlToJson (xml: string|Node): any {
    // based on http://davidwalsh.name/convert-xml-json
    const obj = {};
    const children = [];
    let attrs,
        attr,
        nodes,
        node,
        nodeName,
        nodeValue,
        i,
        len;

    if (typeof xml === 'string') {
      xml = new DOMParser().parseFromString(xml, 'text/xml');
    }

    if (xml.nodeType === 3) {
      if (xml.nodeValue.trim() === '') {
        // ignore whitespace-only text nodes
        return null;
      }
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
      for (i = 0, len = nodes.length; i < len; i++) {
        node = nodes.item(i);
        nodeName = node.nodeName;
        nodeValue = xmlToJson(node);
        if (nodeValue === null) {
          // ignore whitespace-only text nodes
          continue;
        }
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
    if (children.length === 1 &&
        obj['#text'] &&
        Object.keys(obj).length === 1) {
      return obj['#text'];
    }

    return obj;
  }
