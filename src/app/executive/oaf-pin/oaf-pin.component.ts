import { Component, Input } from '@angular/core';

@Component({
  selector: 'executive-oaf-pin',
  templateUrl: './oaf-pin.component.html',
  styleUrls: ['./oaf-pin.component.scss']
})
export class OafPinComponent {

  public link = '../oaf';
  @Input() product: any;
  public title = 'Aftershock Forcast';
  public type = 'oaf';

  constructor() { }
}
