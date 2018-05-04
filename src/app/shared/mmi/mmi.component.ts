import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-mmi',
  templateUrl: './mmi.component.html',
  styleUrls: ['./mmi.component.scss']
})
export class MmiComponent {

  @Input()
  public bubble = false;

  @Input()
  public intensity;

  @Input()
  public value;

  constructor () {}
}
