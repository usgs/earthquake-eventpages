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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { MockPipe } from '../../mock-pipe';
import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

import { EventService } from '@core/event.service';
import { Event } from '../../event';
import { FormLanguageService } from '../form-language.service';
import { FormComponent } from '../form/form.component';
import { TellUsComponent } from './tell-us.component';
import { WindowRef } from '@shared/window-ref-wrapper';

declare let window: any;

describe('TellUsComponent', () => {
  let component: TellUsComponent;
  let fixture: ComponentFixture<TellUsComponent>;

  beforeEach(async(() => {
    const dialogStub = {
      open: () => {
        const closeValue$ = new Subject<any>();
        return {
          afterClosed: () => closeValue$,
          close: value => {
            closeValue$.next(value);
          }
        };
      }
    };
    const nativeWindowRef = new WindowRef();
    const eventServiceStub = {
      event$: of(new Event({}))
    };
    const languageServiceStub = {
      getLanguage: jasmine.createSpy('languageService::getLanguage'),
      language$: of({})
    };
    const locationStub = {
      back: () => {
        return;
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        TellUsComponent,
        FormComponent,

        MockComponent({
          selector: 'location-input-map'
        }),
        MockComponent({
          inputs: ['legend'],
          selector: 'tell-us-fieldset'
        }),
        MockComponent({
          inputs: ['enter', 'update'],
          selector: 'tell-us-location'
        }),
        MockComponent({
          inputs: ['label', 'multiSelect', 'name', 'options', 'value'],
          selector: 'tell-us-question'
        }),
        MockComponent({
          selector: 'tell-us-privacy-statement'
        }),
        MockComponent({
          inputs: ['productType', 'event'],
          selector: 'shared-summary-link'
        }),
        MockComponent({
          inputs: ['success'],
          selector: 'success-view'
        }),
        MockPipe('keys')
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatSelectModule
      ],
      providers: [
        { provide: FormLanguageService, useValue: languageServiceStub },
        { provide: EventService, useValue: eventServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: MatDialog, useValue: dialogStub },
        { provide: WindowRef, useValue: nativeWindowRef }
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

  afterEach(done => {
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
    it('cleans up the error response and response data', () => {
      const data = {
        test: 'test'
      };
      component.error = data;
      component.success = data;
      component.onDialogClose(null);
      expect(component.error).toBeNull();
      expect(component.success).toBeNull();
    });
    it('calls onSuccess with a valid response', () => {
      const response = { your_cdi: '1' };
      spyOn(component, 'onSuccess');
      component.onDialogClose(response);
      expect(component.onSuccess).toHaveBeenCalled();
      expect(component.onSuccess).toHaveBeenCalledWith(response);
    });
    it('calls onError with an HttpError response', () => {
      const response = { error: 'broken' };
      spyOn(component, 'onError');
      component.onDialogClose(response);
      expect(component.onError).toHaveBeenCalled();
      expect(component.onError).toHaveBeenCalledWith(response);
    });
  });

  describe('onError', () => {
    it('sets error response', () => {
      const response = '';
      component.success = null;
      component.onError(response);
      expect(component.error).toBe(response);
    });
  });

  describe('onSuccess', () => {
    it('sets success response', () => {
      const response = { your_cdi: '1' };
      component.success = null;
      component.onSuccess(response);
      expect(component.success).toBe(response);
    });

    it('calls to load facebook SDK', () => {
      const response = { your_cdi: '1' };
      component.success = null;
      spyOn(component, 'loadFacebookSdk').and.callThrough();
      component.onSuccess(response);
      expect(component.loadFacebookSdk).toHaveBeenCalled();
    });
  });

  describe('showForm', () => {
    it('calls onDialogClose with response', done => {
      const response = { response: true };
      const theSpy = spyOn(component, 'onDialogClose');
      component.initPromise.then(() => {
        component.dialogRef.afterClosed().subscribe(() => {
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(component.onDialogClose).toHaveBeenCalledWith(response);
            expect(theSpy).toHaveBeenCalledWith(response);
            done();
          });
        });

        component.dialogRef.close(response);
      });
    });
  });

  it('call the showFacebookPopup and ensure FB.ui is called', () => {
    component.sdkStatus = true;
    component.success = {
      your_cdi: null
    };
    window.FB = {
      ui: jasmine.createSpy().and.returnValue(null)
    };
    component.showFacebookSharePopup();
    expect(window.FB.ui).toHaveBeenCalled();
  });

  it('sets meta tags on component', () => {
    const metaUrl = component.meta.getTag('property="og:url"').content;
    const metaType = component.meta.getTag('property="og:type"').content;
    const metaTitle = component.meta.getTag('property="og:title"').content;
    expect(metaUrl).toEqual(component._windowHref);
    expect(metaType).toEqual('website');
    expect(metaTitle).toEqual('');
  });

  it('calls share popup on social click', () => {
    spyOn(component, 'showFacebookSharePopup');
    const event = {
      preventDefault: function() {}
    };
    component.onSocialClick(event);
    expect(component.showFacebookSharePopup).toHaveBeenCalled();
  });
});
