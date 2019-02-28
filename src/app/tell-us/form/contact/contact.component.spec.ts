import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactComponent,

        MockComponent({ selector: 'tell-us-fieldset', inputs: ['legend'] }),
        MockComponent({ selector: 'textarea', inputs: ['ngModel'] }),
        MockComponent({ selector: 'input', inputs: ['ngModel'] }),
        MockComponent({ selector: 'mat-form-field' }),
        MockComponent({ selector: 'mat-label' })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
