import { Component, Input, OnDestroy } from '@angular/core';

import { FeltReportReponseError } from './../felt-report-reponse-error';

/**
 * Error response component, shows error response after bad form submit
 */
@Component({
  selector: 'error-response',
  styleUrls: ['./error-response.component.scss'],
  templateUrl: './error-response.component.html'
})
export class ErrorResponseComponent {
  @Input() response: FeltReportReponseError;
}
