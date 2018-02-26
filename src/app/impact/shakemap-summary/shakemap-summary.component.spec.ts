import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakemapSummaryComponent } from './shakemap-summary.component';

describe('ShakeMapSummaryComponent', () => {
  let component: ShakemapSummaryComponent;
  let fixture: ComponentFixture<ShakemapSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShakemapSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakemapSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
