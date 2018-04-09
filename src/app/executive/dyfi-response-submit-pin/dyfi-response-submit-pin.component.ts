import { Component, OnInit, Input } from '@angular/core';

import { FormatterService } from '../../core/formatter.service';

@Component({
  selector: 'executive-dyfi-response-submit-pin',
  templateUrl: './dyfi-response-submit-pin.component.html',
  styleUrls: ['./dyfi-response-submit-pin.component.scss']
})
export class DyfiResponseSubmitPinComponent implements OnInit {

  @Input() product: any;

  public link = '../tellus';
  public title = 'Felt Report - Tell Us!';
  public footer = 'Citizen Scientist Contributions';

  constructor(
    public formatterService: FormatterService
  ) { }

  ngOnInit() {
  }

}
