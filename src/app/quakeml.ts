import { toArray } from './to-array';
import { QuakemlEvent } from './quakeml-event';

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
export class Quakeml {
  public namespaces: any = {};

  public publicID: string;
  public creationInfo: any;
  public events: Array<QuakemlEvent> = [];

  constructor(data: any) {
    const quakeml = data['q:quakeml'];

    // read namespaces that appear on root element,
    // since data keys include them.
    for (const key in quakeml) {
      if (key.startsWith('xmlns')) {
        this.namespaces[quakeml[key]] = key.substring('xmlns:'.length);
      }
    }

    const eventParameters = quakeml.eventParameters;
    this.publicID = eventParameters.publicID;
    this.creationInfo = eventParameters.creationInfo;

    this.events = toArray(eventParameters.event).map(e => {
      return new QuakemlEvent(e);
    });
  }

  /**
   * Format channel identifier.
   *
   * @param waveformID pick waveformID
   */
  static formatWaveformID(waveformID: any): string {
    if (!waveformID) {
      return null;
    }

    return (
      waveformID.networkCode +
      ' ' +
      waveformID.stationCode +
      (waveformID.channelCode ? ' ' + waveformID.channelCode : '') +
      (waveformID.locationCode ? ' ' + waveformID.locationCode : '')
    );
  }

  /**
   * Parse a time string using quakeml rules.
   *
   * @param time quakeml time string.
   */
  static parseTime(time: string): Date {
    if (!time) {
      return null;
    }
    if (!time.endsWith('Z')) {
      // quakeml doesn't require Z for UTC; javascript does
      time = time + 'Z';
    }
    return new Date(time);
  }
}
