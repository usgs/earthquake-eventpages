import { HttpErrorResponse } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { Event } from '../../event';
import { FormComponent } from '../form/form.component';
import { FormLanguageService } from '../form-language.service';

import { TellUsComponent } from './tell-us.component';

describe('TellUsComponent', () => {
  let component: TellUsComponent;
  let fixture: ComponentFixture<TellUsComponent>;
  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({}))
    };
    const languageServiceStub = {
      getLanguage: jasmine.createSpy('languageService::getLanguage'),
      language$: of({})
    };

    TestBed.configureTestingModule({
      declarations: [
        TellUsComponent,
        FormComponent,
        MockComponent({
          inputs: ['response'],
          selector: 'tell-us-response'
        }),
        MockComponent({
          inputs: ['productType', 'event'],
          selector: 'shared-summary-link'
        }),
        MockComponent({
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
      imports: [
        BrowserAnimationsModule,
        MatExpansionModule,
        RouterTestingModule
      ],
      providers: [
        { provide: FormLanguageService, useValue: languageServiceStub },
        { provide: EventService, useValue: eventServiceStub }
      ]
    });
    // make FormComponent instantiatable
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [FormComponent]
      }
    });
    TestBed.compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(TellUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onFormResponse', () => {
    it('should set formResponse equal to a given response', () => {
      let testResponse;

      testResponse = {
        Test: 'Test',
        Test1: 'Test1'
      };

      component.onFormResponse(testResponse);

      expect(component.formResponse).toBe(testResponse);
    });

    it('should handle errors correctly', () => {
      const error = new HttpErrorResponse({
        status: 500,
        statusText: 'Error'
      });

      component.onFormResponse(error);

      expect(component.formResponse).toBe(error);
    });
  });
});
