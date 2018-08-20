import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';

import { DownloadDialogComponent } from '@shared/download-dialog/download-dialog.component';

/**
 * Display Magnitude Station Details on the Magnitude tab
 * inside the Origin Module
 */
@Component({
  selector: 'origin-magnitude-detail',
  styleUrls: ['./magnitude-detail.component.scss'],
  templateUrl: './magnitude-detail.component.html'
})
export class MagnitudeDetailComponent implements AfterViewInit {
  // columns to be displayed, and column order
  columnsToDisplay = [
    'channel',
    'type',
    'amplitude',
    'period',
    'status',
    'magnitude',
    'weight'
  ];

  // labels for titles
  columnTitles = {
    amplitude: 'Amplitude',
    channel: 'Channel',
    magnitude: 'Magnitude',
    period: 'Period',
    status: 'Status',
    type: 'Type',
    weight: 'Weight'
  };

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  // sort object from mat-table in view
  // bound to dataSource in ngAfterViewInit
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(public dialog: MatDialog) {
    // numeric sort for numeric fields
    this.dataSource.sortingDataAccessor = this.sortBy;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /**
   * Map contributions input to dataSource.data (which is observable).
   */
  @Input()
  set contributions(contributions: any[]) {
    this.dataSource.data = contributions;
  }
  get contributions() {
    return this.dataSource.data;
  }

  /**
   * Called when download button is clicked.
   *
   * Show a download dialog with tab-separated value content.
   */
  onDownload() {
    const header = this.columnsToDisplay
      .map(c => {
        return this.columnTitles[c];
      })
      .join('\t');

    // data as it is currently rendered
    const contributions = this.dataSource.connect().value;

    const lines = contributions.map(contribution => {
      return this.columnsToDisplay
        .map(c => {
          return contribution[c];
        })
        .join('\t');
    });

    this.dialog.open(DownloadDialogComponent, {
      data: {
        content: header + '\n' + lines.join('\n'),
        message: 'Copy then paste into a spreadsheet application',
        title: 'Download Station Data'
      }
    });
  }

  /**
   * Convert numeric fields to numeric values for sorting.
   *
   * @param data row of data (contribution).
   * @param header column being sorted.
   * @return value of data[header], as number or string.
   */
  sortBy(data: any, header: string): any {
    switch (header) {
      case 'amplitude':
      case 'period':
      case 'magnitude':
      case 'weight':
        return +(data[header] || '').split(' ')[0];
      default:
        return data[header];
    }
  }
}
