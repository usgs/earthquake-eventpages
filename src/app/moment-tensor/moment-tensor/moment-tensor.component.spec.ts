import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { Event } from '../../event';
import { MomentTensorComponent } from './moment-tensor.component';

describe('MomentTensorComponent', () => {
  let component: MomentTensorComponent;
  let fixture: ComponentFixture<MomentTensorComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({})),
      product$: of(null)
    };

    TestBed.configureTestingModule({
      declarations: [
        MomentTensorComponent,

        MockComponent({
          inputs: ['tensor'],
          selector: 'moment-tensor-axes'
        }),
        MockComponent({
          inputs: ['tensor'],
          selector: 'moment-tensor-info'
        }),
        MockComponent({
          inputs: ['product'],
          selector: 'product-page'
        }),
        MockComponent({
          inputs: ['fillColor', 'tensor'],
          selector: 'shared-beachball'
        }),
        MockComponent({
          inputs: ['tensor'],
          selector: 'shared-nodal-planes'
        })
      ],
      imports: [RouterTestingModule],
      providers: [{ provide: EventService, useValue: eventServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentTensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
