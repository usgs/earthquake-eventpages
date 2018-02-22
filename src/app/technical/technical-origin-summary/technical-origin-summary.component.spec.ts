import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Technical-OriginSummaryComponent } from './technical-origin-summary.component';

describe('TechnicalOriginSummaryComponent', () => {
  let component: TechnicalOriginSummaryComponent;
  let fixture: ComponentFixture<TechnicalOriginSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalOriginSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalOriginSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
