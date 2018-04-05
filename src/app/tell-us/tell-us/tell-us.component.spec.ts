import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatDialog, MatExpansionModule, MatSelectModule, MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '../../core/event.service';
import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';
import { FormLanguageService } from '../form-language.service';
import { FormComponent } from '../form/form.component';
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

        MockComponent({selector: 'tell-us-fieldset', inputs: ['legend']}),
        MockComponent({selector: 'tell-us-location', inputs: ['enter', 'update']}),
        MockComponent({selector: 'tell-us-question', inputs: ['label', 'multiSelect', 'name', 'options', 'value']}),
        MockComponent({selector: 'tell-us-privacy-statement'}),
        MockPipe('keys')
      ],
      providers: [
        {provide: FormLanguageService, useValue: languageServiceStub},
        {provide: EventService, useValue: eventServiceStub}
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

  describe('onResponse', () => {
    it('sets response', () => {
      const response = {'response': 'dyfi'};
      component.response = null;
      component.onResponse(response);
      expect(component.response).toBe(response);
    });

    it('handles cancel', () => {
      spyOn(console, 'log');
      component.onResponse(false);
      expect(console.log).toHaveBeenCalledWith('user clicked cancel');
    });

    it('handles submit', () => {
      const response = {'response': 'dyfi'};
      spyOn(console, 'log');
      component.onResponse(response);
      expect(console.log).toHaveBeenCalledWith('user clicked submit', response);
    });

    it('handles undefined', () => {
      const response = undefined;
      spyOn(console, 'log');
      component.onResponse(response);
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe('showForm', () => {
    it('does not call onResponse when response is null', (done) => {
      spyOn(component, 'onResponse');
      component.initPromise.then(() => {
        component.dialogRef.afterClosed().subscribe(() => {
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(component.dialogRef).toBeNull();
            expect(component.onResponse).not.toHaveBeenCalled();
            done();
          });
        });

        component.dialogRef.close(null);
      });
    });

    it('calls onResponse when response is not null', (done) => {
      const response = {'response': true};
      spyOn(component, 'onResponse');
      component.initPromise.then(() => {
        component.dialogRef.afterClosed().subscribe(() => {
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(component.dialogRef).toBeNull();
            expect(component.onResponse).toHaveBeenCalledWith(response);
            done();
          });
        });

        component.dialogRef.close(response);
      });
    });
  });
});
