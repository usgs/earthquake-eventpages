import { Component, Input } from '@angular/core';

import { FormatterService } from '../../core/formatter.service';


@Component({
  selector: 'shared-coordinates',
  templateUrl: './coordinates.component.html',
  styleUrls: ['./coordinates.component.css']
})
export class CoordinatesComponent {

  private _latitude: number;
  private _longitude: number;

  constructor (
    public formatter: FormatterService
  ) { }

  @Input() set latitude (value: any) {
    this._latitude = parseFloat(value);
  }

  @Input() set longitude (value: any) {
    this._longitude = parseFloat(value);
  }

  get latitude (): any {
    return this._latitude;
  }

  get longitude (): any {
    return this._longitude;
  }
}
