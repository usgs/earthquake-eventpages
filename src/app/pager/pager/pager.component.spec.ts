import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { Event } from '../../event';
import { PagerXmlService } from '../pagerxml.service';
import { PagerComponent } from './pager.component';

describe('PagerComponent', () => {
  let component: PagerComponent;
  let fixture: ComponentFixture<PagerComponent>;
  let product;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({})),
      product$: of(null)
    };

    product = {
      properties: {
        alertlevel: 'pending'
      },
      type: 'losspager'
    };

    const pagerXmlServiceStub = {
      getPagerXml: jasmine.createSpy('quakemlService::get'),
      pagerXml$: of(null)
    };

    TestBed.configureTestingModule({
      declarations: [
        PagerComponent,

        MockComponent({
          inputs: ['product', 'showVersion'],
          selector: 'product-page'
        }),
        MockComponent({ selector: 'pager-cities', inputs: ['pager'] }),
        MockComponent({ selector: 'pager-population', inputs: ['pager'] })
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub },
        { provide: PagerXmlService, useValue: pagerXmlServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onProduct', () => {
    it('checks for losspager product', () => {
      component.onProduct({ properties: { alertlevel: null }, type: null });
      expect(component.pagerXmlService.getPagerXml).not.toHaveBeenCalled();
    });

    it('checks that xml was called', () => {
      component.onProduct(product);
      expect(component.pagerXmlService.getPagerXml).toHaveBeenCalled();
    });
  });

  describe('isPending calls', () => {
    it('pending boolean is false', () => {
      const newProduct = product;
      newProduct.properties.alertlevel = 'yellow';
      component.onProduct(newProduct);
      expect(component.pending).toBeFalsy();
    });

    it('pending boolean is true', () => {
      component.onProduct(product);
      fixture.detectChanges();
      expect(component.pending).toBeTruthy();
    });
  });
});
