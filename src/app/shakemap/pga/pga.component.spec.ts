import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs';

import { EventService } from '@core/event.service';
import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';
import { PgaComponent } from './pga.component';

describe('PgaComponent', () => {
  let component: PgaComponent;
  let fixture: ComponentFixture<PgaComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({})),
      product$: null
    };
    TestBed.configureTestingModule({
      declarations: [
        PgaComponent,

        MockComponent({
          inputs: [
            'overlays',
            'showScaleControl',
            'showAttributionControl',
            'bounds'
          ],
          selector: 'shared-map'
        }),
        MockComponent({
          inputs: [
            'product',
            'legendType'
          ],
          selector: 'shakemap-legend'
        }),

        MockPipe('shakemapOverlays'),
        MockPipe('sharedGetMapBounds'),
        MockPipe('sharedProductContent')
      ],
      imports: [RouterTestingModule],
      providers: [{ provide: EventService, useValue: eventServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
