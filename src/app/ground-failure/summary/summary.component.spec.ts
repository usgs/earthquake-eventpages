import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

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
      imports: [
        RouterTestingModule
      ],
      declarations: [
        SummaryComponent,

        MockComponent({selector: 'ground-failure-hazard-alert',
            inputs: ['alert', 'type', 'value']}),
        MockComponent({selector: 'ground-failure-population-alert',
            inputs: ['alert', 'type', 'value']})
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

  describe('getMapBounds', () => {
    it('returns null if no product exists', () => {
      expect(component.getMapBounds(null)).toBeNull();
    });

    it('returns null if no properties exists', () => {
      expect(component.getMapBounds({})).toBeNull();
    });

    it('returns null if no bounds exist', () => {
      expect(component.getMapBounds({properties: {}})).toBeNull();
    });

    it('returns bounds when they exist', () => {
      const bounds = [
        [ 1, 2 ],
        [ 3, 4 ]
      ];
      const product = {
        properties: {
          'minimum-latitude': bounds[0][0],
          'minimum-longitude': bounds[0][1],
          'maximum-latitude': bounds[1][0],
          'maximum-longitude': bounds[1][1]
        }
      };
      expect(component.getMapBounds(product)).toEqual(bounds);
    });
  });
});
