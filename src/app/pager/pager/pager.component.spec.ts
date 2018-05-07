import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { Event } from '../../event';
import { EventService } from '../../core/event.service';
import { PagerXmlService } from '../pagerxml.service';
import { PagerComponent } from './pager.component';


describe('PagerComponent', () => {
  let component: PagerComponent;
  let fixture: ComponentFixture<PagerComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({})),
      product$: of(null)
    };

    const pagerXmlServiceStub = {
      getPagerXml: jasmine.createSpy('quakemlService::get'),
      pagerXml$: of(null)
    };

    TestBed.configureTestingModule({
      declarations: [
        PagerComponent,

        MockComponent({selector: 'product-page', inputs: ['product']}),
        MockComponent({selector: 'pager-cities', inputs: ['pager']}),
        MockComponent({selector: 'pager-population', inputs: ['pager']})
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub},
        {provide: PagerXmlService, useValue: pagerXmlServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
