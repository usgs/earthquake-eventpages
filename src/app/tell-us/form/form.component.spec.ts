import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { MAT_DIALOG_DATA, MatButtonModule, MatExpansionModule, MatDialogModule, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatExpansionModule
      ],
      providers: [
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
