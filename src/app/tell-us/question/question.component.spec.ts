import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';
import { MockComponent } from 'ng2-mock-component';
import { MatListModule, MatRadioModule, MatRadioChange, MatSelectionListChange, MatSelectionList, MatListOption } from '@angular/material';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
      expect(component.change.next).toHaveBeenCalledWith({'test name': 'test value'});
    });

    it('gets values for MatSelectionListChange', () => {
      const source = new MatSelectionList(null, '-1');
      const option1 = new MatListOption(null, null, source);
      option1.value = 'test value 1';
      const option2 = new MatListOption(null, null, source);
      option2.value = 'test value 2';
      const change = new MatSelectionListChange(source, null);
      spyOnProperty(source.selectedOptions, 'selected', 'get').and.returnValue([option1, option2]);

      component.name = 'test name';
      spyOn(component.change, 'next');

      component.onChange(change);
      expect(component.change.next).toHaveBeenCalledWith({'test name': ['test value 1', 'test value 2']});
    });

    it ('does not change value otherwise', () => {
      component.value = 'test value';
      spyOn(component.change, 'next');

      component.name = 'test name';
      component.onChange(null);
      expect(component.change.next).toHaveBeenCalledWith({'test name': 'test value'});
    });
  });

});
