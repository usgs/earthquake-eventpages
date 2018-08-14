import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * PSA subcomponent, shown when user selects the 'psa' tab from main
 * shakemap component
 */
@Component({
  selector: 'shakemap-psa',
  styleUrls: ['./psa.component.scss'],
  templateUrl: './psa.component.html'
})
export class PsaComponent {
  constructor(public eventService: EventService) {}
}
