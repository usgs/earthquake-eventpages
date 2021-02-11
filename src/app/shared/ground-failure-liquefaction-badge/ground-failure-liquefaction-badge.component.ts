import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-ground-failure-liquefaction-badge',
  styleUrls: ['./ground-failure-liquefaction-badge.component.scss'],
  templateUrl: './ground-failure-liquefaction-badge.component.html'
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
