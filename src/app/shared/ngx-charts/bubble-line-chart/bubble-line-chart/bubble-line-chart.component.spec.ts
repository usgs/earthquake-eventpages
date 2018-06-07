import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { BubbleLineChartComponent } from './bubble-line-chart.component';

describe('BubbleLineChartComponent', () => {
  let component: BubbleLineChartComponent;
  let fixture: ComponentFixture<BubbleLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BubbleLineChartComponent,

        MockComponent(
          {
            selector: 'ngx-charts-chart',
            inputs: [
              'view',
              'legendOptions',
              'activeEntries',
              'animations',
              'legendLabelClick',
              'legendLabelActivate',
              'legendLabelDeactivate'
            ]
          }
        )
      ]
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
