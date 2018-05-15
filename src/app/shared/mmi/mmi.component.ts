import { Component, Input } from '@angular/core';

import { RomanPipe } from '../roman.pipe';

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

  public romanPipe = new RomanPipe();

  constructor () {}
}
