import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

/**
 * Download dialog component, used for popup modals on download buttons
 */
@Component({
  selector: 'shared-download-dialog',
  templateUrl: './download-dialog.component.html',
  styleUrls: ['./download-dialog.component.scss']
})
export class DownloadDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
