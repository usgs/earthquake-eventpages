import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-mmi',
  templateUrl: './mmi.component.html',
  styleUrls: ['./mmi.component.scss']
})
export class MmiComponent implements OnInit {

  static MMI_ROMAN = ['I', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII',
        'IX', 'X', 'XI', 'XII'];

  @Input()
  public bubble = false;

  public roman: string;

  private _intensity: number;

  constructor () {}

  ngOnInit () {
  }

  get intensity () {
    return this._intensity;
  }

  @Input()
  set intensity (mmi: number) {
    this._intensity = mmi;
    mmi = Math.round(mmi);

    this.roman = MmiComponent.MMI_ROMAN[mmi];
  }

}
