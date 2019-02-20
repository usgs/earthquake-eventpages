import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent,
        MockComponent({
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
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
        MatExpansionModule
      ]
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

  describe('onSubmit', () => {
    beforeEach(() => {
      spyOn(component, 'validateForm').and.returnValue({
        errors: null,
        value: true
      });
      spyOn(component.httpClient, 'post').and.returnValue(of({}));
      it('calls validateForm', () => {
        component.onSubmit();
        expect(component.validateForm).toHaveBeenCalled();
      });
      it('calls HttpClient post', () => {
        component.onSubmit();
        expect(component.httpClient.post).toHaveBeenCalled();
      });
      it('handles error', () => {
        spyOn(component, 'handleError').and.returnValue(
          of({ error: 'http error' })
        );
        spyOn(component, 'returnErrorResponse').and.returnValue({});
        component.onSubmit();
        expect(component.handleError).toHaveBeenCalled();
        expect(component.returnErrorResponse).toHaveBeenCalled();
      });
    });
  });
});
