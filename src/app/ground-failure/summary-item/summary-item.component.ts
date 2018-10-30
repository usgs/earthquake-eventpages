import { Component, Input } from '@angular/core';
import { GetMapBoundsPipe } from '@shared/get-map-bounds.pipe';

@Component({
  selector: 'summary-item',
  styleUrls: ['./summary-item.component.scss'],
  templateUrl: './summary-item.component.html'
})
export class SummaryItemComponent {
  @Input()
  buttonQueryParams: any;
  hazardColorProperty: string;
  hazardValueProperty: string;
  populationColorProperty: string;
  populationValueProperty: string;
  @Input()
  product: any;
  @Input()
  title: string;

  private _sharedGetMapBounds: GetMapBoundsPipe;
  private _type: string;

  constructor() {
    this._sharedGetMapBounds = new GetMapBoundsPipe();
  }

  @Input()
  set type(newType: string) {
    const groundFailureType = `ground-failure-${newType}`;
    const buttonQueryParams = { bounds: null, shakeMapIntensity: false };

    buttonQueryParams[groundFailureType] = true;
    buttonQueryParams.bounds = this._sharedGetMapBounds.transform(this.product);

    this._type = newType;
    this.buttonQueryParams = buttonQueryParams;
    this.hazardColorProperty = this._type + '-hazard-alert-color';
    this.hazardValueProperty = this._type + '-hazard-alert-value';
    this.populationColorProperty = this._type + '-population-alert-color';
    this.populationValueProperty = this._type + '-population-alert-value';
  }

  get type(): string {
    return this._type;
  }
}
