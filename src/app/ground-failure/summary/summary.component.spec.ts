import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { MockPipe } from '../../mock-pipe';
import { EventService } from '@core/event.service';
import { Event } from '../../event';
import { SummaryComponent } from './summary.component';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      product$: of(new Event(null))
    };

    TestBed.configureTestingModule({
      declarations: [
        SummaryComponent,

        MockComponent({
          inputs: ['alert', 'type', 'value'],
          selector: 'ground-failure-hazard-alert'
        }),
        MockComponent({
          inputs: ['alert', 'type', 'value'],
          selector: 'ground-failure-population-alert'
        }),

        MockPipe('sharedGetMapBounds')
      ],
      imports: [RouterTestingModule],
      providers: [{ provide: EventService, useValue: eventServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
