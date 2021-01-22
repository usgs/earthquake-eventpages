import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-ground-failure-landslide-icon',
  templateUrl: './ground-failure-landslide-icon.component.html',
  styleUrls: ['./ground-failure-landslide-icon.component.scss']
})
export class GroundFailureLandslideIconComponent {
  @Input()
  product;

  constructor() { }
}
