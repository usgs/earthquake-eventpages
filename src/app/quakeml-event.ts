import { toArray } from './to-array';
import { toIndex } from './to-index';

/**
 * Parse a JSON representation of a Quakeml event.
 *
 * @param data
 *        json object (ala xmlToJson) of a quakeml event element.
 */
export class QuakemlEvent {
  amplitudes: any = {};
  catalog: string = null;
  creationInfo: any = null;
  eventid: string = null;
  magnitudes: Array<any> = [];
  origins: Array<any> = [];
  picks: any = {};
  preferredMagnitudeID: string = null;
  preferredOriginID: string = null;
  publicID: string = null;
  stationMagnitudes: any = {};

  constructor(data: any) {
    this.creationInfo = data.creationInfo;
    this.catalog = data['catalog:eventsource'];
    this.eventid = data['catalog:eventid'];
    this.preferredMagnitudeID = data.preferredMagnitudeID;
    this.preferredOriginID = data.preferredOriginID;
    this.publicID = data.publicID;

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
