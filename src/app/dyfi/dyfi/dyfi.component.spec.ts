import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';
import { DyfiComponent } from './dyfi.component';

describe('DyfiComponent', () => {
  let component: DyfiComponent;
  let fixture: ComponentFixture<DyfiComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({})),
      product$: of(null)
    };

    TestBed.configureTestingModule({
      declarations: [
        DyfiComponent,

        MockComponent({
          inputs: ['event', 'products'],
          selector: 'impact-dyfi-summary'
        }),
        MockComponent({ inputs: ['productType'], selector: 'product-page' }),
        MockComponent({ selector: 'mdc-tab-link' }),
        MockComponent({ selector: 'mdc-tab-nav-bar' }),

        MockPipe('sharedGetProducts'),
        MockPipe('sharedProductContent')
      ],
      imports: [RouterTestingModule],
      providers: [{ provide: EventService, useValue: eventServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
