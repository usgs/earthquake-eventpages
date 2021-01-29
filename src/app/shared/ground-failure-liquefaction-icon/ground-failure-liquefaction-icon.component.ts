import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-ground-failure-liquefaction-icon',
  templateUrl: './ground-failure-liquefaction-icon.component.html',
  styleUrls: ['./ground-failure-liquefaction-icon.component.scss']
})
export class GroundFailureLiquefactionIconComponent {
  @Input()
  alert: string;
  @Input()
  areaAlert: string;
  @Input()
  badge = false;
  @Input()
  caption = true;
  @Input()
  populationAlert: string;

  constructor() { }

}
