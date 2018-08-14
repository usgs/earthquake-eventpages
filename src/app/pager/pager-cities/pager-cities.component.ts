import { Component, ElementRef, Input, ViewChild } from '@angular/core';

/**
 * Creates a table on the PAGER module to define the cities and the
 * level of shaking that was experienced by the population of that city.
 *
 * @param pager {Object}
 *     parsed pager.xml object (from pagerXmlService.pagerXml$)
 */
@Component({
  selector: 'pager-cities',
  styleUrls: ['./pager-cities.component.scss'],
  templateUrl: './pager-cities.component.html'
})
export class PagerCitiesComponent {
  columnsToDisplay = ['mmi', 'city', 'population'];

  @Input()
  pager: any;

  @ViewChild('citiesTable', { read: ElementRef })
  tableEl: ElementRef;

  /**
   * Toggles the cities table to show the first ten most exposed cities
   * and the full exposed cities table.
   *
   * @param checkbox
   *     The form control that toggles the filtered/full cities table
   */
  onChange(checkbox: any) {
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
