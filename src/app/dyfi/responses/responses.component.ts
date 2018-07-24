import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { DownloadDialogComponent } from '../../shared/download-dialog/download-dialog.component';
import { DyfiService } from '../dyfi.service';
import { EventService } from '../../core/event.service';
import { RomanPipe } from '../../shared/roman.pipe';

@Component({
  selector: 'dyfi-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss'],
  providers: [RomanPipe]
})
export class ResponsesComponent implements OnInit, OnDestroy {
  private subs = new Subscription;
  public responses = new MatTableDataSource(null);
  public loaded = false;
  public responsesArray = [];
  public headers = [
    'name',
    'cdi',
    'nresp',
    'dist',
    'lat',
    'lon'
  ];
  public columnsToDisplay = [
    'name',
    'state',
    'zip',
    'country',
    'mmi',
    'nresp',
    'dist',
    'lat',
    'lon'
  ];
  public columnTitles = {
    'name': 'Name',
    'state': 'State',
    'zip': 'Zip',
    'country': 'Country',
    'mmi': 'MMI',
    'nresp': 'Responses',
    'dist': 'Distance',
    'lat': 'Latitude',
    'lon': 'Longitude'
  };

  public paginatorSizes = [10, 20, 50, 100, 1000];

  constructor (
    public dyfiService: DyfiService,
    public eventService: EventService,
    public dialog: MatDialog,
    public romanPipe: RomanPipe
  ) { }


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit () {
    this.subs.add(this.dyfiService.cdiZip$.subscribe((data) => {
      this.onDyfiSeries(data);
    }));
    this.subs.add(this.eventService.product$.subscribe((product) => {
      this.onProduct(product);
    }));
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

  onDyfiSeries (dyfiData) {
    this.responses = new MatTableDataSource(dyfiData);
    this.responses.sort = this.sort;
    this.responses.paginator = this.paginator;
    this.loaded = true;
  }

  onDownload () {
   this.responsesArray = this.responses.sortData(this.responses.data, this.sort);

    const headers = this.columnsToDisplay.map((c) => {
      return this.columnTitles[c];
    }).join('\t');

    const lines = this.responsesArray.map((response) => {
      const responseObj = {
        'name': response['name'],
        'state': response['state'],
        'zip': response['zip'],
        'country': response['country'],
        'mmi': '',
        'nresp': response['nresp'],
        'dist': response['dist'] + ' km',
        'lat': response['lat'],
        'lon': response['lon']
      };
      responseObj['mmi'] = this.romanPipe.transform(response['cdi']);

      return this.columnsToDisplay.map((c) => {
        return responseObj[c];
      }).join('\t');
    });

    this.dialog.open(DownloadDialogComponent, {
      data: {
        title: 'Download DYFI Responses',
        message: 'Copy then paste into a spreadsheet application',
        content: headers + '\n' + lines.join('\n')
      }
    });
  }

  ngOnDestroy () {
    this.subs.unsubscribe();
  }


}
