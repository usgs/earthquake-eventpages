import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatListModule,
  MatListOption,
  MatRadioChange,
  MatRadioModule,
  MatSelectionList,
  MatSelectionListChange } from '@angular/material';

import { MockComponent } from 'ng2-mock-component';

import { QuestionComponent } from './question.component';


describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatListModule,
        MatRadioModule
      ],
      declarations: [
        QuestionComponent,

        MockComponent({selector: 'tell-us-fieldset', inputs: ['legend']})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onChange', () => {
    it('gets value for MatRadioChange', () => {
      const change = new MatRadioChange(null, 'test value');

      component.name = 'test name';
      spyOn(component.change, 'next');

      component.onChange(change);
      expect(component.change.next)
        .toHaveBeenCalledWith({'test name': 'test value'});
    });

    it('gets values for MatSelectionListChange', () => {
      const source = new MatSelectionList(null, '-1');
      const option1 = new MatListOption(null, null, source);
      option1.value = 'test value 1';
      const option2 = new MatListOption(null, null, source);
      option2.value = 'test value 2';
      const change = new MatSelectionListChange(source, null);
      spyOnProperty(source.selectedOptions, 'selected', 'get')
        .and.returnValue([option1, option2]);

      component.name = 'test name';
      spyOn(component.change, 'next');

      component.onChange(change);
      expect(component.change.next)
        .toHaveBeenCalledWith({'test name': ['test value 1', 'test value 2']});
    });

    it('gets other value for OtherValueChange', () => {
      component.name = 'test name';
      component.value = 'other';
      spyOn(component.change, 'next');
      component.onChange({type: 'other', value: 'test other'});
      expect(component.change.next).toHaveBeenCalledWith({
        'test name': 'other',
        'test name_Other': 'test other'
      });
    });

    it ('does not change value otherwise', () => {
      component.value = 'test value';
      spyOn(component.change, 'next');

      component.name = 'test name';
      component.onChange(null);
      expect(component.change.next)
        .toHaveBeenCalledWith({'test name': 'test value'});
    });
  });

});
