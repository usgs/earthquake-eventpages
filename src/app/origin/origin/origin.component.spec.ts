import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';

import { EventService } from '@core/event.service';
import { OriginComponent } from './origin.component';

import { MockPipe } from '../../mock-pipe';

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
        MockComponent({ selector: 'mdc-tab-link' }),
        MockComponent({ selector: 'mdc-tab-nav-bar' }),
        MockComponent({
          inputs: ['event', 'products'],
          selector: 'technical-origin-summary'
        }),

        MockPipe('sharedGetProducts')
      ],
      imports: [RouterTestingModule],
      providers: [{ provide: EventService, useValue: eventServiceStub }]
    }).compileComponents();
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
