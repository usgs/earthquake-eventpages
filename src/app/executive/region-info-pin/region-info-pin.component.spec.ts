import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';

import { EventService } from '@core/event.service';
import { MockPipe } from '../../mock-pipe';
import { RegionInfoPinComponent } from './region-info-pin.component';

describe('RegionInfoPinComponent', () => {
  let component: RegionInfoPinComponent;
  let fixture: ComponentFixture<RegionInfoPinComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      getEvent: jasmine.createSpy('eventService::getEvent'),
      getProduct: jasmine.createSpy('eventService::getProduct')
    };

    TestBed.configureTestingModule({
      declarations: [
        RegionInfoPinComponent,

        MockComponent({
          inputs: ['link', 'product', 'title'],
          selector: 'basic-pin'
        }),
        MockComponent({
          inputs: ['overlays', 'showAttributionControl'],
          selector: 'shared-map'
        }),

        MockPipe('getProduct'),
        MockPipe('regionInfoOverlays')
      ],
      imports: [RouterTestingModule],
      providers: [{ provide: EventService, useValue: eventServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionInfoPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
