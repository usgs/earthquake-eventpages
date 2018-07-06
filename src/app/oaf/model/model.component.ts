import { Component } from '@angular/core';

import { OafService } from '../oaf.service';


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
