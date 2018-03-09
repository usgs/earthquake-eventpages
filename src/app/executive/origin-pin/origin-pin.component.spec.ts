import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatListModule
} from '@angular/material';
import { MockComponent } from 'ng2-mock-component';

import { Event } from '../../event';
import { FormatterService } from '../../formatter.service';
import { OriginPinComponent } from './origin-pin.component';


describe('OriginPinComponent', () => {
  let component: OriginPinComponent;
  let fixture: ComponentFixture<OriginPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OriginPinComponent,

        MockComponent({selector: 'shared-product-attribution', inputs: ['product']}),
        MockComponent({
          selector: 'basic-pin',
          inputs: [
            'action',
            'link',
            'subtitle',
            'title',
            'type'
          ]
        })
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: FormatterService, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('set event', () => {
    it('should fetch/set the origin product', () => {
      let event: Event,
          product,
          spy;

      event = new Event({});
      product = { id: 1 };

      // spy on event object
      spy = spyOn(event, 'getProduct').and.returnValue(product);
      // set event
      component.event = event;

      // check component's product value
      expect(spy).toHaveBeenCalled();
      expect(component.product).toEqual(product);
      expect(component.event).toBe(event);
    });

    it('should clear the origin product', () => {
      component.product = {};
      component.event = null;
      expect(component.product).toBeNull();
    });
  });

});
