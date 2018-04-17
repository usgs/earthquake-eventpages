import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ground-failure-alert-bar',
  templateUrl: './alert-bar.component.html',
  styleUrls: ['./alert-bar.component.scss']
})
export class AlertBarComponent implements OnInit {

  @Input()
  bins = [
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

  @Input()
  title = 'Alert Bar Title';

  @Input()
  units = 'km²';

  @Input()
  value: number;

  constructor() { }

  ngOnInit() {
  }

}
