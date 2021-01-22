import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-ground-failure-liquifaction-icon',
  templateUrl: './ground-failure-liquifaction-icon.component.html',
  styleUrls: ['./ground-failure-liquifaction-icon.component.scss']
})
export class GroundFailureLiquifactionIconComponent {
  @Input()
  caption = true;
  @Input()
  product;

  constructor() { }

}
