import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakeAlertSummaryReportComponent } from './shake-alert-summary-report.component';

describe('ShakeAlertSummaryReportComponent', () => {
  let component: ShakeAlertSummaryReportComponent;
  let fixture: ComponentFixture<ShakeAlertSummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShakeAlertSummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeAlertSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
