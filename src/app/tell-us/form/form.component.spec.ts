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
import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { MockPipe } from '../../mock-pipe';
import { FormLanguageService } from '../form-language.service';
import { FormComponent } from './form.component';


describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    const languageServiceStub = {
      getLanguage: jasmine.createSpy('languageService::getLanguage'),
      language$: of(null)
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
        FormComponent,

        MockComponent({selector: 'tell-us-fieldset', inputs: ['legend']}),
        MockComponent({selector: 'tell-us-location', inputs: ['enter', 'update']}),
        MockComponent({selector: 'tell-us-question', inputs: ['label', 'multiSelect', 'name', 'options', 'value']}),
        MockComponent({selector: 'tell-us-privacy-statement'}),
        MockPipe('keys')
      ],
      providers: [
        {provide: FormLanguageService, useValue: languageServiceStub},
        {provide: MatDialogRef, useValue: {close: () => {}}},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    })
    .compileComponents();
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
        'other': 'other value',
        'test': 'test value'
      });
      expect(component.answers).toEqual({
        'other': 'other value',
        'test': 'test value'
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
    it('calls dialogref.close', () => {
      spyOn(component.dialogRef, 'close');
      component.answers = {test: 'submit'};
      component.onSubmit();
      expect(component.dialogRef.close).toHaveBeenCalledWith(component.answers);
    });
  });

  describe('setLanguage', () => {
    it('calls languageService getLanguage', () => {
      component.setLanguage('test value');
      expect(component.languageService.getLanguage).toHaveBeenCalledWith('test value');
    });
  });

});
