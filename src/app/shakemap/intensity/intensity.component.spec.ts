import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';

import { Event } from '../../event';
import { EventService } from '../../core/event.service';
import { IntensityComponent } from './intensity.component';
import { MockPipe } from '../../mock-pipe';
import { of } from 'rxjs/observable/of';

describe('IntensityComponent', () => {
  let component: IntensityComponent;
  let fixture: ComponentFixture<IntensityComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({})),
      product$: null
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        IntensityComponent,

        MockComponent({
          selector: 'shared-map',
          inputs: [
            'overlays',
            'showScaleControl'
          ]
        }),

        MockPipe('shakemapOverlays')
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntensityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
