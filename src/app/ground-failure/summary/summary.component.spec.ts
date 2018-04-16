import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary.component';
import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';
import { Event } from '../../event';
import { EventService } from '../../../..';
import { RouterTestingModule } from '@angular/router/testing';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      product$: of(new Event(null))
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        SummaryComponent,

        MockComponent({selector: 'ground-failure-hazard-alert', inputs: ['alert', 'type', 'value']}),
        MockComponent({selector: 'ground-failure-population-alert', inputs: ['alert', 'type', 'value']})
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub}
      ]
    })
    .compileComponents();
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
