import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatButtonModule,
  MatExpansionModule,
  MatDialogModule,
  MatDialogRef,
  MatSelectModule,
  MatFormFieldModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoordinatesService } from 'hazdev-ng-location-view';
import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';
import { FormLanguageService } from '../form-language.service';
import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({}))
    };
    const coordinatesServiceStub = {
      coordinates$: of({})
    };
    const languageServiceStub = {
      getLanguage: jasmine.createSpy('languageService::getLanguage'),
      language$: of(null)
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatSelectModule
      ],
      declarations: [
        FormComponent,

        MockComponent({
          selector: 'location-input-map'
        }),
        MockComponent({
          selector: 'tell-us-fieldset',
          inputs: ['legend']
        }),
        MockComponent({
          selector: 'tell-us-location',
          inputs: ['enter', 'update']
        }),
        MockComponent({
          selector: 'tell-us-question',
          inputs: ['label', 'multiSelect', 'name', 'options', 'value']
        }),
        MockComponent({
          selector: 'tell-us-privacy-statement'
        }),
        MockPipe('keys')
      ],
      providers: [
        { provide: CoordinatesService, useValue: coordinatesServiceStub },
        { provide: EventService, useValue: eventServiceStub },
        { provide: FormLanguageService, useValue: languageServiceStub },
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
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

  describe('onAnswer', () => {
    it('returns when answer not defined', () => {
      spyOn(Object, 'keys');
      component.onAnswer(null);
      expect(Object.keys).not.toHaveBeenCalled();
    });

    it('copies keys onto answer', () => {
      component.answers = {
        test: 'value'
      };
      component.onAnswer({
        other: 'other value',
        test: 'test value'
      });
      expect(component.answers).toEqual({
        other: 'other value',
        test: 'test value'
      });
    });
  });

  describe('onCancel', () => {
    it('calls dialogref.close', () => {
      spyOn(component.dialogRef, 'close');
      component.onCancel();
      expect(component.dialogRef.close).toHaveBeenCalledWith(false);
    });
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      spyOn(component, 'validateForm').and.returnValue(true);
      spyOn(component.dialogRef, 'close');
      spyOn(component.httpClient, 'post').and.returnValue(of({}));
    });

    it('calls validateForm', () => {
      component.onSubmit();
      expect(component.validateForm).toHaveBeenCalled();
    });

    it('calls HttpClient post', () => {
      component.onSubmit();
      expect(component.httpClient.post).toHaveBeenCalled();
    });

    it('calls dialogref.close', () => {
      component.answers = {};
      component.onSubmit();
      expect(component.dialogRef.close).toHaveBeenCalled();
    });
  });

  describe('setEvent', () => {
    it('clears event id and time', () => {
      component.answers.eventid = 'test eventid';
      component.answers.ciim_time = 'test time';

      component.setEvent(new Event(null));
      expect(component.answers.eventid).toBe(null);
      expect(component.answers.ciim_time).toBe(null);
    });

    it('sets event id and time', () => {
      component.answers.ciim_eventid = undefined;
      component.answers.ciim_time = undefined;

      component.setEvent(
        new Event({
          id: 'testid',
          properties: {
            time: 12345
          }
        })
      );
      expect(component.answers.eventid).not.toBe(null);
      expect(component.answers.ciim_time).not.toBe(null);
    });
  });

  describe('setLanguage', () => {
    it('calls languageService getLanguage', () => {
      component.setLanguage('test value');
      expect(component.languageService.getLanguage).toHaveBeenCalledWith(
        'test value'
      );
    });
  });
});
