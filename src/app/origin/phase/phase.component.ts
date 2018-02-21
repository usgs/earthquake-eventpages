import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EventService } from '../../event.service';
import { Quakeml } from '../../quakeml';
import { QuakemlService } from '../../quakeml.service';
import { Subscription } from 'rxjs/Subscription';
import { Sort } from '@angular/material';



function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


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

  private phases: Array<any>;
  public sortedPhases: Array<any>;

  private productSubscription: Subscription;
  private quakemlSubscription: Subscription;


  constructor(
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
   * Format channel identifier.
   *
   * @param waveformID pick waveformID
   */
  formatChannel (waveformID: any): string {
    return waveformID.networkCode + ' ' + waveformID.stationCode +
        (waveformID.channelCode ? ' ' + waveformID.channelCode : '') +
        (waveformID.locationCode ? ' ' + waveformID.locationCode : '');
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

  /**
   * Observe quakeml changes, parse phases.
   *
   * @param quakeml next quakeml.
   */
  onQuakeml (quakeml: Quakeml): Array<any> {
    const phases = [];

    if (quakeml == null) {
      this.phases = phases;
      return;
    }

    const event = quakeml.events[0];
    const origin = event.preferredOrigin();
    const originTime = new Date(origin.time.value);

    origin.arrival.forEach((arrival) => {
      let pick,
          pickTime;
      try {
        pick = event.picks[arrival.pickID];
        pickTime = new Date(pick.time.value);
      } catch (e) {
        pick = {};
        pickTime = new Date(null);
      }

      phases.push({
        azimuth: arrival.azimuth,
        channel: this.formatChannel(pick.waveformID),
        distance: arrival.distance,
        phase: arrival.phase,
        status: pick.evaluationMode,
        time: pickTime,
        timeRelative: pickTime.getTime() - originTime.getTime(),
        timeResidual: arrival.timeResidual,
        timeWeight: arrival.timeWeight
      });
    });

    this.phases = phases;

    // initial sort is quakeml arrival element order
    this.sortPhases(null);
  }

  /**
   * Set this.sortedPhases based on current sort.
   *
   * @param sort sort event.
   */
  sortPhases (sort: Sort) {
    const phases = this.phases.slice();

    if (!sort || !sort.active || sort.direction === '') {
      this.sortedPhases = phases;
      return;
    }

    phases.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'azimuth': return compare(+a.azimuth, +b.azimuth, isAsc);
        case 'channel': return compare(a.channel, b.channel, isAsc);
        case 'distance': return compare(+a.distance, +b.distance, isAsc);
        case 'phase': return compare(a.phase, b.phase, isAsc);
        case 'residual': return compare(+a.timeResidual, +b.timeResidual, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        case 'time': return compare(a.time.getTime(), b.time.getTime(), isAsc);
        case 'weight': return compare(+a.timeWeight, +b.timeWeight, isAsc);
        default: return 0;
      }
    });

    this.sortedPhases = phases;
  }

}
