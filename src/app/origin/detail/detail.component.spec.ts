import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { DetailComponent } from './detail.component';
import { EventService } from '../../event.service';
import { FormatterService } from '../../formatter.service';


describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      getEvent: jasmine.createSpy('eventService::getEvent'),
      getProduct: jasmine.createSpy('eventService::getProduct')
    };

    const formatterServiceStub = {
    };


    TestBed.configureTestingModule({
      declarations: [
        DetailComponent,

        MockComponent({selector: 'shared-uncertain-value', inputs: ['value', 'uncertainty', 'uncertaintyUnits']}),
        MockComponent({selector: 'shared-coordinates', inputs: ['latitude', 'longitude']}),
        MockComponent({selector: 'shared-fe-region', inputs: ['latitude', 'longitude']}),
        MockComponent({selector: 'shared-attribution', inputs: ['sourceCode']})
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub},
        {provide: FormatterService, useValue: formatterServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
