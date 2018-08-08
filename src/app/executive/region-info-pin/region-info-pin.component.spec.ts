import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';

import { EventService } from '../../core/event.service';
import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';
import { RegionInfoPinComponent } from './region-info-pin.component';


describe('RegionInfoPinComponent', () => {
  let component: RegionInfoPinComponent;
  let fixture: ComponentFixture<RegionInfoPinComponent>;

  const coordinates = {
    latitude: 35,
    longitude: -105,
    zoom: 16
  };

  beforeEach(async(() => {
    const eventServiceStub = {
      getEvent: jasmine.createSpy('eventService::getEvent'),
      getProduct: jasmine.createSpy('eventService::getProduct')
    };

    TestBed.configureTestingModule({
      declarations: [
        RegionInfoPinComponent,

        MockComponent({selector: 'basic-pin',
            inputs: ['link', 'product', 'title']}),
        MockComponent({selector: 'shared-map',
            inputs: ['overlays', 'showAttributionControl']}),

        MockPipe('getProduct'),
        MockPipe('regionInfoOverlays')
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub }
      ]
    })
    .compileComponents();
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
