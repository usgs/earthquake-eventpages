import { Component, OnInit } from '@angular/core';

import { EventService } from '../../core/event.service';

@Component({
  selector: 'executive-waveforms',
  templateUrl: './waveforms.component.html',
  styleUrls: ['./waveforms.component.scss']
})
export class WaveformsComponent implements OnInit {

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

}
