import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FocalMechanismSummaryComponent } from './focal-mechanism-summary.component';

describe('FocalMechanismSummaryComponent', () => {
  let component: FocalMechanismSummaryComponent;
  let fixture: ComponentFixture<FocalMechanismSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocalMechanismSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocalMechanismSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
