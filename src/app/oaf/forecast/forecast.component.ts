import { Component } from '@angular/core';

import { OafService } from '../oaf.service';

/**
 * Display forecaset information in tab on OAF product page
 */
@Component({
  selector: 'oaf-forecast',
  styleUrls: ['./forecast.component.scss'],
  templateUrl: './forecast.component.html'
})
export class ForecastComponent {
  constructor(public oafService: OafService) {}
}
