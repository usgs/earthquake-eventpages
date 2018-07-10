import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { EventService } from '../../core/event.service';
import { WaveformService } from '../waveform.service';


@Component({
  selector: 'executive-waveforms',
  templateUrl: './waveforms.component.html',
  styleUrls: ['./waveforms.component.scss']
})
export class WaveformsComponent implements OnInit {
  subscription: Subscription;

  constructor(
    public eventService: EventService,
    public waveformService: WaveformService
  ) { }

  ngOnInit() {
    this.subscription = this.eventService.event$.subscribe(
      (event) => {
        if (event && event.id) {
          this.waveformService.getIrisEvent(event);
        }

      }
    );
  }

}
