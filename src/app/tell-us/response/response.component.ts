import { FormSubmitService } from 'app/tell-us/form-submit.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { WindowRef } from '@shared/window-ref-wrapper';
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
export class ResponseComponent implements OnDestroy, OnInit {
  @Input()
  response: FeltReportResponse | FeltReportReponseError;

  constructor(
    public windowRef: WindowRef,
    public formService: FormSubmitService
  ) {}

  ngOnDestroy() {
    this.formService.resetResponse();
  }

  ngOnInit() {
    this.windowRef.nativeWindow.scrollTo(0, 0);
  }
}
