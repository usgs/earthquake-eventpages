import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactShakemapSummaryComponent } from './impact-shakemap-summary.component';

describe('ImpactShakeMapSummaryComponent', () => {
  let component: ImpactShakemapSummaryComponent;
  let fixture: ComponentFixture<ImpactShakemapSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpactShakemapSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactShakemapSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
