import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatListModule,
  // MatListOption,
  // MatRadioChange,
  MatRadioModule
  // MatSelectionList,
  // MatSelectionListChange
} from '@angular/material';

import { MockComponent } from 'ng2-mock-component';

import { QuestionComponent } from './question.component';

fdescribe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuestionComponent,

        MockComponent({ selector: 'tell-us-fieldset', inputs: ['legend'] }),
        MockComponent({ selector: 'mat-selection-list', inputs: ['ngModel'] }),
        MockComponent({
          selector: 'mat-list-option',
          inputs: ['checkboxPosition', 'selected', 'value']
        }),
        MockComponent({ selector: 'mat-radio-group', inputs: ['ngModel'] }),
        MockComponent({ selector: 'mat-list' }),
        MockComponent({ selector: 'mat-list-item' }),
        MockComponent({ selector: 'mat-radio-button', inputs: ['value'] }),
        MockComponent({ selector: 'mat-form-field' }),
        MockComponent({
          selector: 'input',
          inputs: ['disabled', 'ngModel', 'placeholder']
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('trackByIndex', () => {
  //   it('returns the index', () => {
  //     const index = 1;
  //     const result = component.trackByIndex(index, null);
  //     expect(index).toBe(result);
  //   });
  // });
});
