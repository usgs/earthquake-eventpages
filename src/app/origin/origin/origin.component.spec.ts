import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';

import { EventService } from '../../core/event.service';
import { OriginComponent } from './origin.component';


describe('OriginComponent', () => {
  let component: OriginComponent;
  let fixture: ComponentFixture<OriginComponent>;

  beforeEach(async(() => {

    const eventServiceStub = {
      getProduct: jasmine.createSpy('eventService::getProduct')
    };

    TestBed.configureTestingModule({
      declarations: [
        OriginComponent,

        MockComponent({ selector: 'product-page', inputs: ['productType'] }),
        MockComponent({ selector: 'mdc-icon' }),
        MockComponent({ selector: 'mdc-tab-bar-scroller' }),
        MockComponent({ selector: 'mdc-tab-bar-scroll-back' }),
        MockComponent({ selector: 'mdc-tab-bar-scroll-frame' }),
        MockComponent({ selector: 'mdc-tab-bar-scroll-forward' })
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
    fixture = TestBed.createComponent(OriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
