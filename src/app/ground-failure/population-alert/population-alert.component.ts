import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ground-failure-population-alert',
  templateUrl: './population-alert.component.html',
  styleUrls: ['./population-alert.component.scss']
})
export class PopulationAlertComponent implements OnInit {

  landslideBins = [
    {
      color: '#27a83c',
      text: 'Little to no',
      min: 10,
      max: 100
    },
    {
      color: '#e5e514',
      text: 'Limited',
      min: 100,
      max: 1000
    },
    {
      color: '#f0a216',
      text: 'Significant',
      min: 1000,
      max: 10000
    },
    {
      color: '#ba2d1a',
      text: 'Extensive',
      min: 10000,
      max: 100000
    }
  ];

  // same for now
  liquefactionBins = this.landslideBins;

  @Input()
  alert: 'green' | 'yellow' | 'orange' | 'red';

  @Input()
  type: 'landslide' | 'liquefaction';

  @Input()
  title = 'Estimated Population Exposure';

  @Input()
  units = '';

  @Input()
  value: number;


  constructor() { }

  ngOnInit() {
  }

}
