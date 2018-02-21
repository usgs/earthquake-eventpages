import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EventService } from '../../event.service';
import { Quakeml } from '../../quakeml';
import { QuakemlService } from '../../quakeml.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'origin-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css']
})
export class PhaseComponent implements OnInit, OnDestroy {

  public columnsToDisplay = [
    'channel',
    'distance',
    'azimuth',
    'phase',
    'time',
    'status',
    'residual',
    'weight'
  ];

  private productSubscription: Subscription;

  constructor(
    public eventService: EventService,
    public quakemlService: QuakemlService
  ) { }

  ngOnInit () {
    this.productSubscription = this.eventService.product$.subscribe((product) => {
      this.onProduct(product);
    });
  }

  ngOnDestroy () {
    this.productSubscription.unsubscribe();
  }

  getPhases (quakeml: Quakeml): Array<any> {
    if (quakeml == null) {
      return [];
    }

    const phases = [];

    const event = quakeml.events[0];
    const origin = event.preferredOrigin();
    const originTime = new Date(origin.time.value);

    origin.arrival.forEach((arrival) => {
      let pick;
      try {
        pick = event.picks[arrival.pickID] || {};
      } catch (e) {
        pick = {};
      }

      const pickTime = new Date(pick.time.value);

      phases.push({
        azimuth: arrival.azimuth,
        distance: arrival.distance,
        phase: arrival.phase,
        status: pick.evaluationMode,
        time: pickTime,
        timeRelative: pickTime.getTime() - originTime.getTime(),
        timeResidual: arrival.timeResidual,
        timeWeight: arrival.timeWeight,
        waveformID: pick.waveformID
      });
    });

    console.log(phases);

    return phases;
  }

  getJson (data: any): string {
    return JSON.stringify(data, null, 2);
  }

  /**
   * Observe selected product, and request phase-data from quakeml service.
   *
   * @param product next product.
   */
  onProduct (product) {
    if (product && product.phasedata) {
      product = product.phasedata;
    }
    this.quakemlService.get(product);
  }
}
