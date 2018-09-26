import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  MatSort,
  MatTableDataSource,
  MatPaginator,
  MatDialog
} from '@angular/material';
import { Subscription } from 'rxjs';

import { EventService } from '@core/event.service';
import { DownloadDialogComponent } from '@shared/download-dialog/download-dialog.component';
import { RomanPipe } from '@shared/roman.pipe';
import { DyfiService } from '../dyfi.service';

/**
 * Generate DYFI RESPONSES tab for dyfi product page
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  providers: [RomanPipe],
  selector: 'dyfi-responses',
  styleUrls: ['./responses.component.scss'],
  templateUrl: './responses.component.html'
})
export class ResponsesComponent implements OnInit, OnDestroy {
  columnsToDisplay = [
    'name',
    'state',
    'country',
    'zip',
    'mmi',
    'nresp',
    'dist',
    'lat',
    'lon'
  ];
  columnTitles = {
    country: 'Country',
    dist: 'Distance',
    lat: 'Latitude',
    lon: 'Longitude',
    mmi: 'MMI',
    name: 'City',
    nresp: 'Responses',
    state: 'State/Region',
    zip: 'Zip Code'
  };
  headers = ['name', 'cdi', 'nresp', 'dist', 'lat', 'lon'];
  loaded = false;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  paginatorSizes = [10, 20, 50, 100, 1000];
  responses = new MatTableDataSource(null);
  responsesArray = [];
  @ViewChild(MatSort)
  sort: MatSort;
  subs = new Subscription();

  constructor (
    public dyfiService: DyfiService,
    public eventService: EventService,
    public dialog: MatDialog,
    public romanPipe: RomanPipe
  ) {}

  filter (filterValue) {
    this.responses.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy () {
    this.subs.unsubscribe();
  }

  ngOnInit () {
    this.subs.add(
      this.dyfiService.cdiZip$.subscribe(data => {
        this.onDyfiSeries(data);
      })
    );
    this.subs.add(
      this.eventService.product$.subscribe(product => {
        this.onProduct(product);
      })
    );
  }

  /**
   * Generate string of sorted DYFI responses and open material dialog
   */
  onDownload () {
    this.responsesArray = this.responses.sortData(
      this.responses.filteredData,
      this.sort
    );

    const headers = this.columnsToDisplay
      .map(c => {
        return this.columnTitles[c];
      })
      .join('\t');

    const lines = this.responsesArray.map(response => {
      const responseObj = {
        country: response.country,
        dist: response.dist + ' km',
        lat: response.lat,
        lon: response.lon,
        mmi: '',
        name: response.name,
        nresp: response.nresp,
        state: response.state,
        zip: response.zip
      };
      responseObj.mmi = this.romanPipe.transform(response.cdi);

      return this.columnsToDisplay
        .map(c => {
          return responseObj[c];
        })
        .join('\t');
    });

    this.dialog.open(DownloadDialogComponent, {
      data: {
        content: headers + '\n' + lines.join('\n'),
        message: 'Copy then paste into a spreadsheet application',
        title: 'Download DYFI Responses'
      }
    });
  }

  /**
   * Create a table with DYFI responses
   *
   * @param dyfiData
   *     cdi/responses data from dyfi service
   */
  onDyfiSeries (dyfiData) {
    this.responses = new MatTableDataSource(dyfiData);
    this.responses.sort = this.sort;
    this.responses.paginator = this.paginator;
    this.loaded = true;
  }

  /**
   * New product, get new station list
   *
   * @param product shakemap product
   */
  onProduct (product) {
    if (product === null) {
      this.responses = null;
      this.loaded = false;
      return;
    }

    this.dyfiService.getCdi(product);
  }

  /**
   * Checks for changes to data by index
   *
   * @param index
   *    index of array
   * @param item
   *    general text product
   */
  trackByIndex (index, item) {
    return index;
  }
}
