import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegressionPlotComponent } from './regression-plot.component';

describe('RegressionPlotComponent', () => {
  let component: RegressionPlotComponent;
  let fixture: ComponentFixture<RegressionPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegressionPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegressionPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
