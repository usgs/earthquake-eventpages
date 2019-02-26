import { Component, Input } from '@angular/core';

import { FeltReportReponseError } from './../felt-report-reponse-error';

@Component({
  selector: 'error-response',
  styleUrls: ['./error-response.component.scss'],
  templateUrl: './error-response.component.html'
})
export class ErrorResponseComponent {
  @Input() response: FeltReportReponseError;
}
