import { Component, Input, OnInit } from '@angular/core';

import { WindowRef } from './../../shared/window-ref-wrapper';
import { FeltReportReponseError } from './../felt-report-reponse-error';
import { FeltReportResponse } from './../felt-report-response';

/**
 * Parent response dumb component which is used to pass response to child
 */
@Component({
  selector: 'tell-us-response',
  styleUrls: ['./response.component.scss'],
  templateUrl: './response.component.html'
})
export class ResponseComponent implements OnInit {
  @Input()
  response: FeltReportResponse | FeltReportReponseError;

  constructor(public windowRef: WindowRef) {}

  ngOnInit() {
    this.windowRef.nativeWindow.scrollTo(0, 0);
  }
}
