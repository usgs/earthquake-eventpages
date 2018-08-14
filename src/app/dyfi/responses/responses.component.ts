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
  selector: 'dyfi-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss'],
  providers: [RomanPipe],
  encapsulation: ViewEncapsulation.None
})
export class ResponsesComponent implements OnInit, OnDestroy {
  public columnTitles = {
    name: 'City',
    state: 'State/Region',
    country: 'Country',
    zip: 'Zip Code',
    mmi: 'MMI',
    nresp: 'Responses',
    dist: 'Distance',
    lat: 'Latitude',
    lon: 'Longitude'
  };
  public columnsToDisplay = [
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
  public headers = ['name', 'cdi', 'nresp', 'dist', 'lat', 'lon'];
  public loaded = false;
  public paginatorSizes = [10, 20, 50, 100, 1000];
  public responsesArray = [];
  public responses = new MatTableDataSource(null);
  public subs = new Subscription();

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    public dyfiService: DyfiService,
    public eventService: EventService,
    public dialog: MatDialog,
    public romanPipe: RomanPipe
  ) {}

  ngOnInit() {
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

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  /**
   * Generate string of sorted DYFI responses and open material dialog
   */
  onDownload() {
    this.responsesArray = this.responses.sortData(
      this.responses.data,
      this.sort
    );

    const headers = this.columnsToDisplay
      .map(c => {
        return this.columnTitles[c];
      })
      .join('\t');

    const lines = this.responsesArray.map(response => {
      const responseObj = {
        name: response['name'],
        state: response['state'],
        country: response['country'],
        zip: response['zip'],
        mmi: '',
        nresp: response['nresp'],
        dist: response['dist'] + ' km',
        lat: response['lat'],
        lon: response['lon']
      };
      responseObj['mmi'] = this.romanPipe.transform(response['cdi']);

      return this.columnsToDisplay
        .map(c => {
          return responseObj[c];
        })
        .join('\t');
    });

    this.dialog.open(DownloadDialogComponent, {
      data: {
        title: 'Download DYFI Responses',
        message: 'Copy then paste into a spreadsheet application',
        content: headers + '\n' + lines.join('\n')
      }
    });
  }

  /**
   * Create a table with DYFI responses
   *
   * @param dyfiData
   *     cdi/responses data from dyfi service
   */
  onDyfiSeries(dyfiData) {
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
  onProduct(product) {
    if (product === null) {
      this.responses = null;
      this.loaded = false;
      return;
    }

    this.dyfiService.getCdi(product);
  }
}
