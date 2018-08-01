import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '../../core/event.service';
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
      imports: [
        RouterTestingModule
      ],
      declarations: [
        MomentTensorComponent,

        MockComponent({selector: 'moment-tensor-axes',
            inputs: ['tensor']}),
        MockComponent({selector: 'moment-tensor-info',
            inputs: ['tensor']}),
        MockComponent({selector: 'product-page',
            inputs: ['product']}),
        MockComponent({selector: 'shared-beachball',
            inputs: ['fillColor', 'tensor']}),
        MockComponent({selector: 'shared-nodal-planes',
            inputs: ['tensor']})
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub}
      ]
    })
    .compileComponents();
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
