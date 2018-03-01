import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatTableModule } from '@angular/material';
import { of } from 'rxjs/observable/of';

import { Event } from '../../event';
import { EventService } from '../../event.service';
import { DyfiSummaryComponent } from './dyfi-summary.component';
import { FormatterService } from '../../formatter.service';

describe('DyfisummaryComponent', () => {
  let component: DyfiSummaryComponent;
  let fixture: ComponentFixture<DyfiSummaryComponent>;

  let products = [
    {
      source: 'us',
      properties: {
        eventsource: 'us',
        maxmmi: 4.7,
        numResp: 300
      }
    }
  ];

  let event;

  beforeEach(async(() => {
    const eventServiceStub = {
      //product$: of({}),
      event$: of({})
    };

    event = new Event({});

    spyOn(event, 'getProducts').and.returnValue(products);

    TestBed.configureTestingModule({
      declarations: [
        DyfiSummaryComponent
      ],
      imports: [
        MatDialogModule,
        MatTableModule
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub},
        FormatterService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyfiSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onEvent', () => {
    it('returns correct values', () => {
      component.onEvent(event);
      expect(component.dyfiData).toEqual([{
        'catalog': 'us',
        'cdi': 4.7,
        'responses': 300,
        'source': 'us'
      });
    });
  });
});
