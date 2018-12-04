import { Component, Input } from '@angular/core';

@Component({
  selector: 'shake-alert-summary-report',
  styleUrls: ['./shake-alert-summary-report.component.scss'],
  templateUrl: './shake-alert-summary-report.component.html'
})
export class ShakeAlertSummaryReportComponent {
  @Input()
  properties: any;
}
