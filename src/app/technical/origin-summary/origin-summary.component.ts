import { Component, OnInit, Input } from '@angular/core';
import { FormatterService } from '../../core/formatter.service';

@Component({
  selector: 'technical-origin-summary',
  templateUrl: './origin-summary.component.html',
  styleUrls: ['./origin-summary.component.css']
})
export class OriginSummaryComponent implements OnInit {

  public columnsToDisplay = [
    'catalog',
    'magnitude',
    'time',
    'depth',
    'status',
    'location',
    'source'
  ];

  @Input() event: any;

  @Input() products: Array<any>;

  constructor(
    public formatterService: FormatterService
  ) { }

  ngOnInit () {
  }

  toDate (str: string) {
    return new Date(str);
  }

}
