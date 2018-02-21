import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /**
   * Select textarea content when focused.
   *
   * @param e focus event
   */
  onFocus(e: any) {
    e.target.select();
    e.target.scrollTop = 0;
  }

}
