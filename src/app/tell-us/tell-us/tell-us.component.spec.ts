import { Location } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatDialog,
  MatExpansionModule,
  MatSelectModule,
  MatFormFieldModule
} from '@angular/material';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  BrowserDynamicTestingModule
} from '@angular/platform-browser-dynamic/testing';

import { MockPipe } from '../../mock-pipe';
import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

import { EventService } from '../../core/event.service';
import { Event } from '../../event';
import { FormLanguageService } from '../form-language.service';
import { FormComponent } from '../form/form.component';
import { TellUsComponent } from './tell-us.component';


describe('TellUsComponent', () => {
  let component: TellUsComponent;
  let fixture: ComponentFixture<TellUsComponent>;

  beforeEach(async(() => {
    const dialogStub = {
      open: () => {
        const closeValue$ = new Subject<any>();
        return {
          afterClosed: () => closeValue$,
          close: (value) => {
            closeValue$.next(value);
          }
        };
      }
    };

    const eventServiceStub = {
      event$: of(new Event({}))
    };
    const languageServiceStub = {
      getLanguage: jasmine.createSpy('languageService::getLanguage'),
      language$: of({})
    };
    const locationStub = {
      back: () => { return; }
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatSelectModule
      ],
      declarations: [
        TellUsComponent,
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
        MockComponent({
          selector: 'shared-summary-link',
          inputs: ['productType', 'event']
        }),
        MockPipe('keys')
      ],
      providers: [
        { provide: FormLanguageService, useValue: languageServiceStub },
        { provide: EventService, useValue: eventServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: MatDialog, useValue: dialogStub }
      ],
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

  afterEach((done) => {
    component.initPromise.then(() => {
      if (component.dialogRef) {
        component.dialogRef.close(null);
      }
      done();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onDialogClose', () => {
    it('cleans up the dialog reference', () => {
      component.onDialogClose(null);
      expect(component.dialogRef).toBeNull();
    });
    it('calls onSuccess with a valid response', () => {
      const response = { 'your_cdi': '1' };
      spyOn(component, 'onSuccess');
      component.onDialogClose(response);
      expect(component.onSuccess).toHaveBeenCalled();
      expect(component.onSuccess).toHaveBeenCalledWith(response);
    });
    it('calls onError with an HttpError response', () => {
      const response = { 'error': 'broken' };
      spyOn(component, 'onError');
      component.onDialogClose(response);
      expect(component.onError).toHaveBeenCalled();
      expect(component.onError).toHaveBeenCalledWith(response);
    });
  });

  describe('onError', () => {
    it('sets error response', () => {
      const response = { 'message': 'error' };
      component.response = null;
      component.onError(response);
      expect(component.error).toBe(response);
    });
  });

  describe('onSuccess', () => {
    it('sets success response', () => {
      const response = { 'your_cdi': '1' };
      component.response = null;
      component.onSuccess(response);
      expect(component.response).toBe(response);
    });
  });

  describe('showForm', () => {
    it('calls onDialogClose with response', (done) => {
      const response = {'response': true};
      spyOn(component, 'onDialogClose');
      component.initPromise.then(() => {
        component.dialogRef.afterClosed().subscribe(() => {
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(component.onDialogClose).toHaveBeenCalledWith(response);
            done();
          });
        });

        component.dialogRef.close(response);
      });
    });
  });
});
