import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedBubbleChartComponent } from './bubble-chart.component';

describe('ExtendedBubbleChartComponent', () => {
  let component: ExtendedBubbleChartComponent;
  let fixture: ComponentFixture<ExtendedBubbleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedBubbleChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedBubbleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
