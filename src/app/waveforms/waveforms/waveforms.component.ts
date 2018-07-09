import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { EventService } from '../../core/event.service';

@Component({
  selector: 'executive-waveforms',
  templateUrl: './waveforms.component.html',
  styleUrls: ['./waveforms.component.scss']
})
export class WaveformsComponent implements OnInit {

  constructor(private eventService: EventService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  backToTech(event) {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

}
