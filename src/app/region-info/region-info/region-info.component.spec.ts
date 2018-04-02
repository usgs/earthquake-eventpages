import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { RouterTestingModule } from '@angular/router/testing';

import { RegionInfoComponent } from './region-info.component';
import { Event } from '../../event';
import { of } from 'rxjs/observable/of';
import { EventService } from '../../../..';
import { MockPipe } from '../../mock-pipe';

describe('RegionInfoComponent', () => {
  let component: RegionInfoComponent;
  let fixture: ComponentFixture<RegionInfoComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({}))
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        RegionInfoComponent,

        MockComponent({selector: 'shared-map', inputs: ['overlays', 'showScaleControl']}),
        MockPipe('getProduct'),
        MockPipe('regionInfoOverlays')
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
