import { Component } from '@angular/core';

import { OafService } from '../oaf.service';

/**
 * Display model information in a tab on OAF product page
 */
@Component({
  selector: 'oaf-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent {

  constructor (
    public oafService: OafService
  ) { }

}
