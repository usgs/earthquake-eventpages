import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'pager-cities',
  templateUrl: './pager-cities.component.html',
  styleUrls: ['./pager-cities.component.scss']
})
export class PagerCitiesComponent {
  @ViewChild('citiesTable', {read: ElementRef}) tableEl: ElementRef;

  public columnsToDisplay = [
    'mmi',
    'city',
    'population'
  ];

  @Input() pager;

  constructor() { }

  toggleCities () {
    let el;

    const className = 'show';
    el = this.tableEl.nativeElement;

    if (el.classList.contains(className)) {
      el.classList.remove(className);
    } else {
      el.classList.add(className);
    }
  }

}
