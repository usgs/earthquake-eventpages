import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';
import { IntensityComponent } from './intensity.component';

describe('IntensityComponent', () => {
  let component: IntensityComponent;
  let fixture: ComponentFixture<IntensityComponent>;
  let shakemap;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({})),
      product$: of({})
    };

    TestBed.configureTestingModule({
      declarations: [
        IntensityComponent,

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
        MockPipe('sharedFileSize'),
        MockPipe('sharedProductContent')
      ],
      imports: [
        FormsModule,
        MatRadioModule,
        RouterTestingModule
      ],
      providers: [{ provide: EventService, useValue: eventServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntensityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setDefaultOverlay', () => {
    it('Sets coverage overlay when available', () => {
      shakemap = {
        'contents': {
          'download/coverage_mmi_high_res.covjson': {}
        }
      };

      component.setDefaultOverlays(shakemap);
      expect(component.overlays).toBe(component.coverageOverlays);
    });

    it('Sets image overlay when coverage is not available', () => {
      shakemap = {
        'contents': {
          'notCoverage': {}
        }
      };

      component.setDefaultOverlays(shakemap);
      expect(component.overlays).toBe(component.imageOverlays);
    });
  });
});
