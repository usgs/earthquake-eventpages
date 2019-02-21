import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitComponent } from './submit.component';
import { FormSubmitService } from 'app/tell-us/form-submit.service';

describe('SubmitComponent', () => {
  let component: SubmitComponent;
  let fixture: ComponentFixture<SubmitComponent>;

  beforeEach(async(() => {
    const formSubmitServiceStub = {};
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
});
