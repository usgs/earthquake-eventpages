import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { QuestionComponent } from './question.component';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuestionComponent,
        MockComponent({
          inputs: ['disabled', 'ngModel', 'placeholder'],
          selector: 'input'
        }),
        MockComponent({ selector: 'mat-form-field' }),
        MockComponent({ selector: 'mat-list' }),
        MockComponent({ selector: 'mat-list-item' }),
        MockComponent({
          inputs: ['checkboxPosition', 'selected', 'value'],
          selector: 'mat-list-option'
        }),
        MockComponent({ selector: 'mat-radio-button', inputs: ['value'] }),
        MockComponent({ selector: 'mat-radio-group', inputs: ['ngModel'] }),
        MockComponent({ selector: 'mat-selection-list', inputs: ['ngModel'] }),
        MockComponent({ selector: 'tell-us-fieldset', inputs: ['legend'] })
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

  describe('trackByIndex', () => {
    it('returns the index', () => {
      const index = 1;
      const result = component.trackByIndex(index, null);
      expect(index).toBe(result);
    });
  });
});
