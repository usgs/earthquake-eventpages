import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseComponent } from './response.component';
import { MockPipe } from 'app/mock-pipe';
import { MockComponent } from 'ng2-mock-component';

describe('ResponseComponent', () => {
  let component: ResponseComponent;
  let fixture: ComponentFixture<ResponseComponent>;

  beforeEach(async(() => {
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
});
