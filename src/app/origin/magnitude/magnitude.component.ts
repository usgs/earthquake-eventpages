import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../core/event.service';
import { QuakemlService } from '../../core/quakeml.service';

import { toArray } from '../../to-array';
import { Quakeml } from '../../quakeml';


@Component({
  selector: 'origin-magnitude',
  templateUrl: './magnitude.component.html',
  styleUrls: ['./magnitude.component.css']
})
export class MagnitudeComponent implements OnInit, OnDestroy {

  /** phases parsed from quakeml. */
  public magnitudes: Array<any>;

  /** subscription to product observable */
  private productSubscription: Subscription;

  /** subscription to quakeml observable */
  private quakemlSubscription: Subscription;

  constructor (
    public eventService: EventService,
    public quakemlService: QuakemlService
  ) { }


  ngOnInit () {
    this.productSubscription = this.eventService.product$.subscribe((product) => {
      this.onProduct(product);
    });
    this.quakemlSubscription = this.quakemlService.quakeml$.subscribe((quakeml) => {
      this.onQuakeml(quakeml);
    });
  }

  ngOnDestroy () {
    this.productSubscription.unsubscribe();
    this.quakemlSubscription.unsubscribe();
  }

  /**
   * Observe selected product, request quakeml.
   *
   * @param product next product.
   */
  onProduct (product) {
    this.quakemlService.getQuakeml(product);
  }

  /**
   * Observe quakeml changes, parse phases.
   *
   * @param quakeml next quakeml.
   */
  onQuakeml (quakeml: Quakeml): Array<any> {
    if (quakeml === null) {
      this.magnitudes = [];
      return;
    }

    const event = quakeml.events[0];
    const magnitudes = event.magnitudes.map((mag) => {
      return this.parseMagnitude(mag, event);
    });

    // sort preferred magnitude first
    magnitudes.sort((a, b) => {
      if (a.isPreferred) {
        return -1;
      } else if (b.isPreferred) {
        return 1;
      } else {
        return 0;
      }
    });

    this.magnitudes = magnitudes;
  }

  parseContribution (contribution, event) {
    const parsed = {
      amplitude: null,
      amplitudeID: null,
      channel: null,
      magnitude: null,
      period: null,
      residual: null,
      stationMagnitudeID: null,
      status: null,
      type: null,
      unit: null,
      weight: null
    };

    const stationMagnitude = (contribution.stationMagnitudeID ?
        event.stationMagnitudes[contribution.stationMagnitudeID] : null) || {};
    const amplitude = (stationMagnitude.amplitudeID ?
        event.amplitudes[stationMagnitude.amplitudeID] : null) || {};

    parsed.stationMagnitudeID = contribution.stationMagnitudeID;
    parsed.amplitudeID = stationMagnitude.amplitudeID;

    if (amplitude.genericAmplitude) {
      parsed.amplitude = amplitude.genericAmplitude.value +
          (amplitude.unit ? ' ' + amplitude.unit : '');
    }
    parsed.channel = Quakeml.formatWaveformID(amplitude.waveformID || stationMagnitude.waveformID);
    if (stationMagnitude.mag) {
      parsed.magnitude = stationMagnitude.mag.value;
    }
    parsed.residual = contribution.residual;
    parsed.status = amplitude.evaluationMode || stationMagnitude.evaluationMode || 'automatic';
    parsed.type = stationMagnitude.type;
    if (amplitude.period) {
      parsed.period = amplitude.period.value + ' s';
    }
    parsed.weight = contribution.weight;

    // cleanup if amplitude is period
    if (parsed.period === null && amplitude.unit === 's') {
      parsed.period = parsed.amplitude;
      parsed.amplitude = null;
    }

    return parsed;
  }

  parseMagnitude (magnitude, event) {
    const parsed = {
      contributions: null,
      isPreferred: false,
      magnitude: null,
      magnitudeError: null,
      magnitudePublicID: null,
      status: null,
      source: null,
      stationCount: null,
      type: null
    };

    parsed.isPreferred = (magnitude.publicID === event.preferredMagnitudeID);
    if (magnitude.mag) {
      parsed.magnitude = magnitude.mag.value;
      parsed.magnitudeError = magnitude.mag.uncertainty;
    }
    parsed.magnitudePublicID = magnitude.publicID;
    parsed.status = magnitude.evaluationMode;
    parsed.source = (magnitude.creationInfo || {}).agencyID ||
        (event.creationInfo || {}).agencyID;
    parsed.stationCount = magnitude.stationCount;
    parsed.type = magnitude.type;

    parsed.contributions = toArray(magnitude.stationMagnitudeContribution).map((smc) => {
      return this.parseContribution(smc, event);
    });

    return parsed;
  }

}
