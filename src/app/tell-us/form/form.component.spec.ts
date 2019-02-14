import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent,
        MockComponent({
          inputs: ['language'],
          selector: 'tell-us-metadata'
        }),
        MockComponent({
          inputs: ['event', 'feltReport', 'labels'],
          selector: 'tell-us-form-felt'
        }),
        MockComponent({
          inputs: ['event', 'feltReport', 'labels'],
          selector: 'tell-us-form-location'
        }),
        MockComponent({
          inputs: ['expanded'],
          selector: 'mat-expansion-panel'
        }),
        MockComponent({ selector: 'mat-expansion-panel-header' }),
        MockComponent({
          inputs: ['feltReport', 'labels'],
          selector: 'tell-us-form-optional'
        }),
        MockComponent({
          inputs: ['feltReport', 'labels'],
          selector: 'tell-us-form-contact'
        }),
        MockComponent({
          inputs: ['feltReport', 'labels'],
          selector: 'tell-us-form-submit'
        })
      ],
      imports: [],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
