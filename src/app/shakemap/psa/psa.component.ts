import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * PSA subcomponent, shown when user selects the 'psa' tab from main
 * shakemap component
 */
@Component({
  selector: 'shakemap-psa',
  templateUrl: './psa.component.html',
  styleUrls: ['./psa.component.scss']
})
export class PsaComponent {
  constructor(public eventService: EventService) {}
}
