import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { MockPipe } from '../../mock-pipe';
import { ImpactComponent } from './impact.component';

describe('ImpactComponent', () => {
  let component: ImpactComponent;
  let fixture: ComponentFixture<ImpactComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(null),
      getProduct: jasmine.createSpy('eventService::getProduct')
    };
    TestBed.configureTestingModule({
      declarations: [
        ImpactComponent,

        MockComponent({
          inputs: ['event', 'products'],
          selector: 'impact-dyfi-summary'
        }),
        MockComponent({
          inputs: ['product'],
          selector: 'shared-text-product'
        }),
        MockComponent({
          inputs: ['product'],
          selector: 'shared-link-product'
        }),
        MockComponent({
          inputs: ['event', 'products'],
          selector: 'impact-pager-summary'
        }),
        MockComponent({
          inputs: ['event', 'products'],
          selector: 'impact-shakemap-summary'
        }),

        MockPipe('sharedGetProducts'),
        MockPipe('sharedHasProduct')
      ],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: EventService,
          useValue: eventServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
