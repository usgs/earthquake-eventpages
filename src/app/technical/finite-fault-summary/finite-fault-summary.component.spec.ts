import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiniteFaultSummaryComponent } from './finite-fault-summary.component';

describe('FiniteFaultSummaryComponent', () => {
  let component: FiniteFaultSummaryComponent;
  let fixture: ComponentFixture<FiniteFaultSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiniteFaultSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiniteFaultSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
