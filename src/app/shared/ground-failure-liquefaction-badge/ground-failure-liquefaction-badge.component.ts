import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-ground-failure-liquefaction-badge',
  templateUrl: './ground-failure-liquefaction-badge.component.html',
  styleUrls: ['./ground-failure-liquefaction-badge.component.scss']
})
export class GroundFailureLiquefactionBadgeComponent {
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
