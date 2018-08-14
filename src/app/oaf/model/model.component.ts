import { Component } from '@angular/core';

import { OafService } from '../oaf.service';

/**
 * Display model information in a tab on OAF product page
 */
@Component({
  selector: 'oaf-model',
  styleUrls: ['./model.component.scss'],
  templateUrl: './model.component.html'
})
export class ModelComponent {
  constructor(public oafService: OafService) {}
}
