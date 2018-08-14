import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { EventService } from '@core/event.service';
import { WaveformService } from '../waveform.service';

/**
 * Create event page that links to IRIS products/ waveform data
 *
 */
@Component({
  selector: 'executive-waveforms',
  styleUrls: ['./waveforms.component.scss'],
  templateUrl: './waveforms.component.html'
})
export class WaveformsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    public eventService: EventService,
    public waveformService: WaveformService
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.eventService.event$.subscribe(event => {
      if (event && event.id) {
        this.waveformService.getIrisEvent(event);
      }
    });
  }
}
