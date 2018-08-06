import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';

import { Event } from '../../event';
import { EventService } from '../../core/event.service';
import { ImpactComponent } from './impact.component';
import { MockComponent } from 'ng2-mock-component';

describe('ImpactComponent', () => {
  let component: ImpactComponent;
  let fixture: ComponentFixture<ImpactComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event(null)),
      getProduct: jasmine.createSpy('eventService::getProduct')
    };
    TestBed.configureTestingModule({
      declarations: [
        ImpactComponent,

        MockComponent({
          selector: 'impact-dyfi-summary',
          inputs: ['event', 'products']
        }),
        MockComponent({
          selector: 'shared-text-product',
          inputs: ['product']
        }),
        MockComponent({
          selector: 'shared-link-product',
          inputs: ['product']
        }),
        MockComponent({
          selector: 'impact-pager-summary',
          inputs: ['event', 'products']
        }),
        MockComponent({
          selector: 'impact-shakemap-summary',
          inputs: ['event', 'products']
        })
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: EventService,
          useValue: eventServiceStub
        }
      ]
    })
    .compileComponents();
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
