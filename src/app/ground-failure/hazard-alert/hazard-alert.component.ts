import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ground-failure-hazard-alert',
  templateUrl: './hazard-alert.component.html',
  styleUrls: ['./hazard-alert.component.scss']
})
export class HazardAlertComponent implements OnInit {

  @Input()
  alert: 'green' | 'yellow' | 'orange' | 'red';

  landslideBins = [
    {
      color: '#27a83c',
      text: 'Little to no',
      min: 0,
      max: 1
    },
    {
      color: '#e5e514',
      text: 'Limited',
      min: 1,
      max: 10
    },
    {
      color: '#f0a216',
      text: 'Significant',
      min: 10,
      max: 100
    },
    {
      color: '#ba2d1a',
      text: 'Extensive',
      min: 100,
      max: 1000
    }
  ];

  liquefactionBins = [
    {
      color: '#27a83c',
      text: 'Little to no',
      min: 0,
      max: 10
    },
    {
      color: '#e5e514',
      text: 'Limited',
      min: 10,
      max: 100
    },
    {
      color: '#f0a216',
      text: 'Significant',
      min: 100,
      max: 1000
    },
    {
      color: '#ba2d1a',
      text: 'Extensive',
      min: 1000,
      max: 10000
    }
  ];

  @Input()
  title = 'Estimated Area Exposed to Hazard';

  @Input()
  type: 'landslide' | 'liquefaction';

  @Input()
  units = 'km²';

  @Input()
  value: number;


  constructor() { }

  ngOnInit() {
  }

}
