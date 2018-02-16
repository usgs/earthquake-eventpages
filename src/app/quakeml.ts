
/**
 * Convert x to an array, unless it's already an array.
 *
 * @param x to convert.
 * @return Array, which is empty if x is not truthy.
 */
function toArray(x: any) {
  if (!x) {
    return [];
  } else if (!Array.isArray(x)) {
    return [x];
  }
  return x;
}

/**
 * Build an index for an array of objects, based on an object property.
 *
 * If a key is not unique across all objects,
 * the last object with that key will be in index.
 *
 * @param values array of objects.
 * @param key object property to use as key.
 */
function toIndex(values: Array<any>, key: string) {
  const index = {};
  values.forEach((value) => {
    index[value[key]] = value;
  });
  return index;
}


/**
 * Parse a JSON representation of a Quakeml event.
 *
 * @param data
 *        json object (ala xmlToJson) of a quakeml event element.
 */
class QuakemlEvent {
  // event attributes
  public catalog: string = null;
  public creationInfo: any = null;
  public eventid: string = null;
  public preferredMagnitudeID: string = null;
  public preferredOriginID: string = null;

  // origins and magnitude elements
  public magnitudes: Array<any> = [];
  public origins: Array<any> = [];

  // indexes of related elements referenced by origins and/or magnitudes
  public picks: any = {};
  public amplitudes: any = {};
  public stationMagnitudes: any = {};

  constructor(
    data: any
  ) {
    if (!data) {
      return;
    }

    this.creationInfo = data.creationInfo;
    this.catalog = data['catalog:eventsource'];
    this.eventid = data['catalog:eventid'];

    this.preferredMagnitudeID = data['preferredMagnitudeID'];
    this.preferredOriginID = data['preferredOriginID'];

    this.magnitudes = toArray(data.magnitude);
    this.origins = toArray(data.origin);

    this.amplitudes = toIndex(toArray(data.amplitude), 'publicID');
    this.picks = toIndex(toArray(data.pick), 'publicID');
    this.stationMagnitudes = toIndex(toArray(data.stationMagnitude), 'publicID');
  }

  preferredMagnitude(): any {
    return this.magnitudes.find((m) => {
      return m.publicID === this.preferredMagnitudeID;
    });
  }

  preferredOrigin(): any {
    return this.origins.find((o) => {
      return o.publicID === this.preferredOriginID;
    });
  }
}


/**
 * Parse a JSON representation of quakeml.
 *
 * Requires "common" namespace usage:
 * - xmlns="http://quakeml.org/xmlns/bed/1.2"
 * - xmlns:q="http://quakeml.org/xmlns/quakeml/1.2"
 *
 * @param data
 *        json object (ala xmlToJson) of a quakeml event element.
 * @param eventElementName: string
 *        default "event", override if there are subclassed event elements.
 */
class Quakeml {

  public namespaces: any = {};

  public publicID: string;
  public creationInfo: any;
  public events: Array<QuakemlEvent> = [];

  constructor(
    data: any,
    eventElementName: string = 'event'
  ) {
    if (!data) {
      return;
    }

    const quakeml = data['q:quakeml'];

    // read namespaces that appear on root element,
    // since data keys include them.
    for (const key in quakeml) {
      if (key.startsWith('xmlns')) {
        const value = quakeml[key];
        this.namespaces[quakeml[key]] = key.substring('xmlns:'.length);
      }
    }

    const eventParameters = quakeml.eventParameters;
    this.publicID = eventParameters.publicID;
    this.creationInfo = eventParameters.creationInfo;

    this.events = toArray(eventParameters[eventElementName]).map((e) => {
      return new QuakemlEvent(e);
    });
  }

}



export {
  Quakeml,
  QuakemlEvent
};
