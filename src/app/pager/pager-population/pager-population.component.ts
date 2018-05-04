import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pager-population',
  templateUrl: './pager-population.component.html',
  styleUrls: ['./pager-population.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PagerPopulationComponent implements OnInit {

  public columnsToDisplay = [
    'mmi',
    'shaking',
    'population'
  ];

  @Input() pager = null;

  constructor() { }

  ngOnInit() {
  }

}
