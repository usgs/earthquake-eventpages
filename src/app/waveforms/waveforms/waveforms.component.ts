import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { EventService } from '../../core/event.service';
import { WaveformService } from '../waveform.service';

/**
 * Generates the IRIS links for the waveform page
 */
@Component({
  selector: 'executive-waveforms',
  templateUrl: './waveforms.component.html',
  styleUrls: ['./waveforms.component.scss']
})
export class WaveformsComponent implements OnInit, OnDestroy {


  public subscription: Subscription;


  constructor (
    public eventService: EventService,
    public waveformService: WaveformService
  ) { }


  /**
   * Waveform service subscription, which returns the IRIS event via http
   */
  ngOnInit () {
    this.subscription = this.eventService.event$.subscribe(
      (event) => {
        if (event && event.id) {
          this.waveformService.getIrisEvent(event);
        }

      }
    );
  }

  /**
   * Unsubscribe from waveform service event when component is destroyed
   */
  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

}
