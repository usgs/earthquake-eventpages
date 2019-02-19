import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { Event } from '../../event';
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
        MockComponent({
          inputs: ['response'],
          selector: 'tell-us-response'
        }),
        MockComponent({
          inputs: ['event', 'labels'],
          selector: 'tell-us-form'
        }),
        MockComponent({
          inputs: ['event', 'productType'],
          selector: 'shared-summary-link'
        })
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: EventService, useValue: eventServiceStub },
        { provide: FormLanguageService, useValue: languageServiceStub }
      ]
    });

    // make FormComponent instantiatable
    // TestBed.overrideModule(BrowserDynamicTestingModule, {
    //   set: {
    //     entryComponents: [FormComponent]
    //   }
    // });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TellUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // afterEach(done => {
  //   component.initPromise.then(() => {
  //     if (component.dialogRef) {
  //       component.dialogRef.close(null);
  //     }
  //     done();
  //   });
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('onDialogClose', () => {
  //   it('cleans up the dialog reference', () => {
  //     component.onDialogClose(null);
  //     expect(component.dialogRef).toBeNull();
  //   });
  //   it('cleans up the error response and response data', () => {
  //     const data = {
  //       test: 'test'
  //     };
  //     component.error = data;
  //     component.success = data;
  //     component.onDialogClose(null);
  //     expect(component.error).toBeNull();
  //     expect(component.success).toBeNull();
  //   });
  //   it('calls onSuccess with a valid response', () => {
  //     const response = { your_cdi: '1' };
  //     spyOn(component, 'onSuccess');
  //     component.onDialogClose(response);
  //     expect(component.onSuccess).toHaveBeenCalled();
  //     expect(component.onSuccess).toHaveBeenCalledWith(response);
  //   });
  //   it('calls onError with an HttpError response', () => {
  //     const response = { error: 'broken' };
  //     spyOn(component, 'onError');
  //     component.onDialogClose(response);
  //     expect(component.onError).toHaveBeenCalled();
  //     expect(component.onError).toHaveBeenCalledWith(response);
  //   });
  // });

  // describe('onError', () => {
  //   it('sets error response', () => {
  //     const response = { message: 'error' };
  //     component.success = null;
  //     component.onError(response);
  //     expect(component.error).toBe(response);
  //   });
  // });

  // describe('onSuccess', () => {
  //   it('sets success response', () => {
  //     const response = { your_cdi: '1' };
  //     component.success = null;
  //     component.onSuccess(response);
  //     expect(component.success).toBe(response);
  //   });
  // });

  // describe('showForm', () => {
  //   it('calls onDialogClose with response', done => {
  //     const response = { response: true };
  //     spyOn(component, 'onDialogClose').and.callThrough();
  //     component.initPromise.then(() => {
  //       component.dialogRef.afterClosed().subscribe(() => {
  //         fixture.detectChanges();
  //         fixture
  //           .whenStable()
  //           .then(() => {
  //             expect(component.onDialogClose).toHaveBeenCalledWith(response);
  //             done();
  //           })
  //           .catch(reject => {
  //             // Handle promise rejection
  //           });
  //       });

  //       component.dialogRef.close(response);
  //     });
  //   });
  // });
});
