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

  onChange (checkbox) {
    let el;

    el = this.tableEl.nativeElement;

    const className = 'show';

    if (checkbox && checkbox.checked) {
      el.classList.add(className);
    } else {
      el.classList.remove(className);
    }
  }

}
