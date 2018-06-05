import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleLineChartComponent } from './bubble-line-chart.component';

describe('BubbleLineChartComponent', () => {
  let component: BubbleLineChartComponent;
  let fixture: ComponentFixture<BubbleLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BubbleLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
