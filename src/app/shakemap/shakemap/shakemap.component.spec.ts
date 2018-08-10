import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';


import { EventService } from '../../core/event.service';
import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';
import { ShakemapComponent } from './shakemap.component';


describe('ShakemapComponent', () => {
  let component: ShakemapComponent;
  let fixture: ComponentFixture<ShakemapComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({})),
      product$: null
    };

    TestBed.configureTestingModule({
      declarations: [
        ShakemapComponent,

        MockComponent({ selector: 'product-page', inputs: ['productType'] }),
        MockComponent({ selector: 'mdc-icon' }),
        MockComponent({ selector: 'mdc-tab-bar-scroller' }),
        MockComponent({ selector: 'mdc-tab-bar-scroll-back' }),
        MockComponent({ selector: 'mdc-tab-bar-scroll-frame' }),
        MockComponent({ selector: 'mdc-tab-bar-scroll-forward' }),

        MockPipe('sharedProductContent')
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
    fixture = TestBed.createComponent(ShakemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
