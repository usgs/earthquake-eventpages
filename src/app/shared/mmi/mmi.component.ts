import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-mmi',
  templateUrl: './mmi.component.html',
  styleUrls: ['./mmi.component.scss']
})
export class MmiComponent implements OnInit {
  static MMI_ROMAN = ['I', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII',
        'IX', 'X', 'XI', 'XII'];

  public roman: string;

  private _intensity: number;

  @Input() set intensity(mmi: number) {
    this._intensity = mmi;
    mmi = Math.round(mmi);

    this.roman = MmiComponent.MMI_ROMAN[mmi];
  }

  get intensity() {
    return this._intensity;
  }

  constructor() {}

  ngOnInit() {
  }
}
