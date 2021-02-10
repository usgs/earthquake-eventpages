import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-ground-failure-landslide-badge',
  styleUrls: ['./ground-failure-landslide-badge.component.scss'],
  templateUrl: './ground-failure-landslide-badge.component.html'
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
