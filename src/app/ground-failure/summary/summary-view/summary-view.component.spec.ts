import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';

import { MockPipe } from '../../../mock-pipe';
import { SummaryViewComponent } from './summary-view.component';

describe('SummaryViewComponent', () => {
  let component: SummaryViewComponent;
  let fixture: ComponentFixture<SummaryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SummaryViewComponent,
        MockComponent({
          inputs: ['alert'],
          selector: 'ground-failure-hazard-alert'
        }),
        MockComponent({
          inputs: [
            'hazardAlertColor',
            'hazardAlertValue',
            'populationAlertColor',
            'populationAlertValue',
            'type'
          ],
          selector: 'ground-failure-type'
        }),

        MockPipe('pending'),
        MockPipe('sharedGetMapBounds'),
        MockPipe('sharedProductProperty')
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
