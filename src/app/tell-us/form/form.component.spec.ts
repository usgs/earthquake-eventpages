import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent,
        MockComponent({
          inputs: ['language'],
          selector: 'tell-us-metadata'
        }),
        MockComponent({
          inputs: ['event', 'feltReport', 'labels'],
          selector: 'tell-us-form-felt'
        }),
        MockComponent({
          inputs: ['event', 'feltReport', 'labels'],
          selector: 'tell-us-form-location'
        }),
        MockComponent({
          inputs: ['expanded'],
          selector: 'mat-expansion-panel'
        }),
        MockComponent({ selector: 'mat-expansion-panel-header' }),
        MockComponent({
          inputs: ['feltReport', 'labels'],
          selector: 'tell-us-form-optional'
        }),
        MockComponent({
          inputs: ['feltReport', 'labels'],
          selector: 'tell-us-form-contact'
        }),
        MockComponent({
          inputs: ['feltReport', 'labels'],
          selector: 'tell-us-form-submit'
        })
      ],
      imports: [],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onEvent', () => {
    it('sets time and eventid', () => {
      const time = Date.now();
      const event = {
        data: null,
        deleted: false,
        geometry: null,
        getProduct: null,
        getProducts: null,
        getSources: null,
        hasProducts: null,
        id: 'testID',
        product: null,
        properties: {
          time: time
        },
        setPreferred: null,
        source: ['source1'],
        sources: null
      };
      component.onEvent(event);
      expect(component.feltReport.ciim_time).not.toBeNull();
      expect(component.feltReport.ciim_time).toBeDefined();
      expect(component.feltReport.eventid).toEqual('testID');
    });
    it('sets nothing with null', () => {
      component.onEvent(null);
      expect(component.feltReport.ciim_time).toBeNull();
      expect(component.feltReport.eventid).toBeNull();
    });
  });

  describe('onChanges', () => {
    it('calls onEvent', () => {
      const simpleChange = new SimpleChange('oldEvent', 'newEvent', true);
      spyOn(component, 'onEvent');
      component.ngOnChanges({ event: simpleChange });
      expect(component.onEvent).toHaveBeenCalled();
    });
    it('does not call onEvent', () => {
      const simpleChange = new SimpleChange('oldEvent', 'newEvent', true);
      spyOn(component, 'onEvent');
      component.ngOnChanges({ notEvent: simpleChange });
      expect(component.onEvent).not.toHaveBeenCalled();
    });
  });
});
