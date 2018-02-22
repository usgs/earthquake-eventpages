import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalMomentTensorSummaryComponent } from './technical-moment-tensor-summary.component';

describe('TechnicalMomentTensorSummaryComponent', () => {
  let component: TechnicalMomentTensorSummaryComponent;
  let fixture: ComponentFixture<TechnicalMomentTensorSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalMomentTensorSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalMomentTensorSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
