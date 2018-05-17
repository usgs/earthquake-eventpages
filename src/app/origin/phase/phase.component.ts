import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, Sort } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import { EventService } from '../../core/event.service';
import { Quakeml } from '../../quakeml';
import { QuakemlService } from '../../core/quakeml.service';

import { DownloadDialogComponent } from '../../shared/download-dialog/download-dialog.component';
import { toArray } from '../../to-array';
import { FormatterService } from '../../core/formatter.service';

/**
 * Generic compare function used by PhaseComponent.sortPhases.
 *
 * @param a
 *        first object to compared.
 * @param b
 *        second object to compare.
 * @param isAsc
 *        ascending order (true) or descending order (false)
 */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


@Component({
  selector: 'origin-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css']
})
export class PhaseComponent implements OnInit, OnDestroy {

  // columns to be displayed, and solumn order
  public columnsToDisplay = [
    'channel',
    'distance',
    'azimuth',
    'phase',
    'time',
    'status',
    'timeResidual',
    'timeWeight'
  ];

  // labels for titles
  public columnTitles = {
    'azimuth': 'Azimuth',
    'channel': 'Channel',
    'distance': 'Distance',
    'phase': 'Phase',
    'status': 'Status',
    'time': 'Arrival Time',
    'timeResidual': 'Residual',
    'timeWeight': 'Weight'
  };

  /** phases parsed from quakeml. */
  public phases: Array<any>;

  /** phases after sorting. */
  public sortedPhases: Array<any>;

  /** subscription to product observable */
  private productSubscription: Subscription;

  /** subscription to quakeml observable */
  private quakemlSubscription: Subscription;


  constructor(
    public dialog: MatDialog,
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
   * Called when download button is clicked.
   *
   * Show a download dialog with tab-separated value content.
   */
  onDownload () {
    const header = this.columnsToDisplay.map((c) => {
      return this.columnTitles[c];
    }).join('\t');

    const lines = this.sortedPhases.map((phase) => {
      return this.columnsToDisplay.map((c) => {
        return phase[c];
      }).join('\t');
    });

    this.dialog.open(DownloadDialogComponent, {
      data: {
        title: 'Download Phase Arrival Times',
        message: 'Copy then paste into a spreadsheet application',
        content: header + '\n' + lines.join('\n')
      }
    });
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
    const phases = [];

    if (quakeml == null) {
      this.phases = phases;
      return;
    }

    const event = quakeml.events[0];
    const origin = event.preferredOrigin();
    const originTime = Quakeml.parseTime(origin.time.value);

    toArray(origin.arrival).forEach((arrival) => {
      let pick;
      let time;
      let timeRelative;

      try {
        pick = event.picks[arrival.pickID];
        time = Quakeml.parseTime(pick.time.value);
      } catch (e) {
        pick = {};
        time = null;
        timeRelative = null;
      }

      if (time) {
        timeRelative = (time.getTime() - originTime.getTime()) / 1000;
        time = time.toISOString();
      }

      phases.push({
        arrivalPublicID: arrival.publicID,
        azimuth: arrival.azimuth,
        channel: Quakeml.formatWaveformID(pick.waveformID),
        distance: arrival.distance,
        phase: arrival.phase,
        pickPublicId: pick.publicID,
        status: pick.evaluationMode,
        time: time,
        timeRelative: timeRelative,
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
        case 'status': return compare(a.status, b.status, isAsc);
        case 'time': return compare(a.time, b.time, isAsc);
        case 'timeResidual': return compare(+a.timeResidual, +b.timeResidual, isAsc);
        case 'timeWeight': return compare(+a.timeWeight, +b.timeWeight, isAsc);
        default: return 0;
      }
    });

    this.sortedPhases = phases;
  }

}
