import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '../../core/event.service';
import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';
import { FocalMechanismComponent } from './focal-mechanism.component';

describe('FocalMechanismComponent', () => {
  let component: FocalMechanismComponent;
  let fixture: ComponentFixture<FocalMechanismComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({})),
      product$: of(null)
    };

    TestBed.configureTestingModule({
      declarations: [
        FocalMechanismComponent,

        MockComponent({
          selector: 'focal-mechanism-attribution',
          inputs: ['tensor']
        }),
        MockComponent({
          selector: 'product-page',
          inputs: ['product']
        }),
        MockComponent({
          selector: 'shared-beachball',
          inputs: ['fillColor', 'tensor']
        }),
        MockComponent({
          selector: 'shared-nodal-planes',
          inputs: ['tensor']
        }),

        MockPipe('sharedTensor')
      ],
      providers: [{ provide: EventService, useValue: eventServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocalMechanismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
