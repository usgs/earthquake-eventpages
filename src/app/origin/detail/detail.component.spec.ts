import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { EventService } from '../../event.service';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      empty: jasmine.createSpy('eventService::empty'),
      getEvent: jasmine.createSpy('eventService::getEvent'),
      getProduct: jasmine.createSpy('eventService::getProduct')
    };


    TestBed.configureTestingModule({
      declarations: [ DetailComponent ],
      providers: [
        {provide: EventService, useValue: eventServiceStub}
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
