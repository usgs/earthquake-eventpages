import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DownloadDialogComponent } from '../../shared/download-dialog/download-dialog.component';

@Component({
  selector: 'origin-magnitude-detail',
  templateUrl: './magnitude-detail.component.html',
  styleUrls: ['./magnitude-detail.component.css']
})
export class MagnitudeDetailComponent implements OnInit {

  // columns to be displayed, and solumn order
  public columnsToDisplay = [
    'channel',
    'type',
    'amplitude',
    'period',
    'status',
    'magnitude',
    'weight'
  ];

  // labels for titles
  public columnTitles = {
    'amplitude': 'Amplitude',
    'channel': 'Channel',
    'magnitude': 'Magnitude',
    'period': 'Period',
    'status': 'Status',
    'type': 'Type',
    'weight': 'Weight'
  };

  @Input() contributions: Array<any>;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  /**
   * Called when download button is clicked.
   *
   * Show a download dialog with tab-separated value content.
   */
  onDownload () {
    const header = this.columnsToDisplay.map((c) => {
      return this.columnTitles[c];
    }).join('\t');

    const lines = this.contributions.map((contribution) => {
      return this.columnsToDisplay.map((c) => {
        return contribution[c];
      }).join('\t');
    });

    this.dialog.open(DownloadDialogComponent, {
      data: {
        title: 'Download Station Magnitudes',
        message: 'Copy then paste into a spreadsheet application',
        content: header + '\n' + lines.join('\n')
      }
    });
  }

}
