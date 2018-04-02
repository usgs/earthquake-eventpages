import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'shared-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StationComponent implements OnInit {
  @Input() station: any;
  public channelsColumns = ['name', 'pga', 'pgv', 'psa03', 'psa10', 'psa30'];

  constructor() {}

   ngOnInit() {
   }

}
