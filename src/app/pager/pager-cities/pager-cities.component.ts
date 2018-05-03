import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pager-cities',
  templateUrl: './pager-cities.component.html',
  styleUrls: ['./pager-cities.component.scss']
})
export class PagerCitiesComponent implements OnInit {

  @Input() pager;

  constructor() { }

  ngOnInit() {
  }

}
