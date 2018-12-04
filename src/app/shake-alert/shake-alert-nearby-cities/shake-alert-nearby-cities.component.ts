import { Component, Input } from '@angular/core';

@Component({
  selector: 'shake-alert-nearby-cities',
  styleUrls: ['./shake-alert-nearby-cities.component.scss'],
  templateUrl: './shake-alert-nearby-cities.component.html'
})
export class ShakeAlertNearbyCitiesComponent {
  _cities: Array<any>;

  columnsToDisplay = ['city', 'warning-time', 'mmi', 'population'];

  @Input()
  set cities(cities: any) {
    this._cities = cities.features;
  }

  get cities() {
    return this._cities;
  }
}
