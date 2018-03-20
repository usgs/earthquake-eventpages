import { Component, OnInit, Input } from '@angular/core';
import { FormatterService } from '../../core/formatter.service';

@Component({
  selector: 'technical-focal-mechanism-summary',
  templateUrl: './focal-mechanism-summary.component.html',
  styleUrls: ['./focal-mechanism-summary.component.scss']
})
export class FocalMechanismSummaryComponent implements OnInit {

  public columnsToDisplay = [
    'catalog',
    'mechanism',
    'nodalPlane1',
    'nodalPlane2',
    'source'
  ];

  @Input() event: any;
  @Input() products: Array<any>;

  constructor(
    public formatterService: FormatterService
  ) { }

  ngOnInit () { }

}
