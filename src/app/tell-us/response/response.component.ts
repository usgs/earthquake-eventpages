import { Component, Input } from '@angular/core';

import { FeltReportReponseError } from './../felt-report-reponse-error';
import { FeltReportResponse } from './../felt-report-response';

@Component({
  selector: 'tell-us-response',
  styleUrls: ['./response.component.scss'],
  templateUrl: './response.component.html'
})
export class ResponseComponent {
  @Input()
  response: FeltReportResponse | FeltReportReponseError;
}
