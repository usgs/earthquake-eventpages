import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitComponent } from './submit.component';
import { FormSubmitService } from 'app/tell-us/form-submit.service';
import { FeltReport } from 'app/tell-us/felt-report';

describe('SubmitComponent', () => {
  let component: SubmitComponent;
  let fixture: ComponentFixture<SubmitComponent>;

  beforeEach(async(() => {
    const formSubmitServiceStub = {
      onSubmit: () => {}
    };
    TestBed.configureTestingModule({
      declarations: [SubmitComponent],
      imports: [FormsModule],
      providers: [
        { provide: FormSubmitService, useValue: formSubmitServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should call formSubmitService.onSubmit', () => {
      const feltReport = new FeltReport();
      spyOn(component.formSubmitService, 'onSubmit');
      component.feltReport = feltReport;
      component.onSubmit();
      expect(component.formSubmitService.onSubmit).toHaveBeenCalled();
      expect(component.formSubmitService.onSubmit).toHaveBeenCalledWith(
        feltReport
      );
    });
  });

  describe('scrollToTop', () => {
    it('should call window.scroll', () => {
      spyOn(window, 'scroll');
      component.scrollToTop();
      expect(window.scroll).toHaveBeenCalled();
    });
  });
});
