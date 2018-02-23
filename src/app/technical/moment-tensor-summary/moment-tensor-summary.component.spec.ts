import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentTensorSummaryComponent } from './moment-tensor-summary.component';

describe('MomentTensorSummaryComponent', () => {
  let component: MomentTensorSummaryComponent;
  let fixture: ComponentFixture<MomentTensorSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MomentTensorSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentTensorSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
