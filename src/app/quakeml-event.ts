import { toArray } from './to-array';
import { toIndex } from './to-index';

/**
 * Parse a JSON representation of a Quakeml event.
 *
 * @param data
 *        json object (ala xmlToJson) of a quakeml event element.
 */
export class QuakemlEvent {
  // event attributes
  public publicID: string = null;
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

  constructor(data: any) {
    this.creationInfo = data.creationInfo;
    this.catalog = data['catalog:eventsource'];
    this.eventid = data['catalog:eventid'];
    this.preferredMagnitudeID = data['preferredMagnitudeID'];
    this.preferredOriginID = data['preferredOriginID'];
    this.publicID = data['publicID'];

    this.magnitudes = toArray(data.magnitude);
    this.origins = toArray(data.origin);

    this.amplitudes = toIndex(toArray(data.amplitude), 'publicID');
    this.picks = toIndex(toArray(data.pick), 'publicID');
    this.stationMagnitudes = toIndex(
      toArray(data.stationMagnitude),
      'publicID'
    );
  }

  preferredMagnitude(): any {
    return this.magnitudes.find(m => {
      return m.publicID === this.preferredMagnitudeID;
    });
  }

  preferredOrigin(): any {
    return this.origins.find(o => {
      return o.publicID === this.preferredOriginID;
    });
  }
}
