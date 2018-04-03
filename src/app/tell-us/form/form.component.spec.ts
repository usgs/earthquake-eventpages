import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
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
import { of } from 'rxjs/observable/of';
import { FormLanguageService } from '../form-language.service';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    const languageServiceStub = {
      getLanguage: jasmine.createSpy('languageService::getLanguage'),
      language$: of({})
    };

    TestBed.configureTestingModule({
      declarations: [
        FormComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatSelectModule
      ],
      providers: [
        {provide: FormLanguageService, useValue: languageServiceStub},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {close: () => {}}}
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

  describe('changeLanguage', () => {
    it('calls languageService getLanguage', () => {
      component.changeLanguage({value: 'test value'});
      expect(component.languageService.getLanguage).toHaveBeenCalledWith('test value');
    });
  });

  describe('onSubmit', () => {
    it('calls dialogref.close', () => {
      spyOn(component.dialogRef, 'close');
      component.onSubmit();
      expect(component.dialogRef.close).toHaveBeenCalled();
    });
  });

  describe('test buttons', () => {
    it('enters/clears location and felt', () => {
      component.enterLocationAndFelt();
      expect(component.location).not.toBeNull();
      expect(component.felt).not.toBeNull();
      component.clearLocationAndFelt();
      expect(component.location).toBeNull();
      expect(component.felt).toBeNull();
    });
  });

});
