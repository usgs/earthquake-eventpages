import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeltComponent } from './felt.component';
import { MockComponent } from 'ng2-mock-component';
import { MatFormFieldModule } from '@angular/material';

describe('FeltComponent', () => {
  let component: FeltComponent;
  let fixture: ComponentFixture<FeltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FeltComponent,
        MockComponent({
          inputs: [
            'label',
            'labels',
            'model',
            'multiSelect',
            'name',
            'options'
          ],
          selector: 'tell-us-question'
        }),
        MockComponent({
          inputs: ['legend'],
          selector: 'tell-us-fieldset'
        })
      ],
      imports: [FormsModule, MatFormFieldModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
