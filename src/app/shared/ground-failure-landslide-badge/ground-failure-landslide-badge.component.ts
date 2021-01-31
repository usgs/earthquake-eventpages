import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-ground-failure-landslide-badge',
  templateUrl: './ground-failure-landslide-badge.component.html',
  styleUrls: ['./ground-failure-landslide-badge.component.scss']
})
export class GroundFailureLandslideBadgeComponent {
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
