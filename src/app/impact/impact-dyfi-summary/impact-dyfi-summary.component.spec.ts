import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactDyfiSummaryComponent } from './impact-dyfi-summary.component';

describe('ImpactDyfisummaryComponent', () => {
  let component: ImpactDyfiSummaryComponent;
  let fixture: ComponentFixture<ImpactDyfiSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpactDyfiSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactDyfiSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
