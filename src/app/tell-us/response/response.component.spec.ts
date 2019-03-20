import { FormSubmitService } from './../form-submit.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { WindowRef } from './../../shared/window-ref-wrapper';
import { ResponseComponent } from './response.component';
import { MockPipe } from 'app/mock-pipe';

describe('ResponseComponent', () => {
  let component: ResponseComponent;
  let fixture: ComponentFixture<ResponseComponent>;

  beforeEach(async(() => {
    const formSubmitServiceStub = {
      resetResponse: () => {}
    };
    TestBed.configureTestingModule({
      declarations: [
        ResponseComponent,
        MockComponent({
          inputs: ['response'],
          selector: 'error-response'
        }),
        MockComponent({
          inputs: ['response'],
          selector: 'success-response'
        }),
        MockPipe('isErrorResponsePipe')
      ],
      providers: [
        WindowRef,
        { provide: FormSubmitService, useValue: formSubmitServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on NgDestroy calls form service reset', () => {
    it('calls reset', () => {
      spyOn(component.formService, 'resetResponse');
      component.ngOnDestroy();
      expect(component.formService.resetResponse).toHaveBeenCalled();
    });
  });
});
