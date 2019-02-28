import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { WindowRef } from './../../shared/window-ref-wrapper';
import { ResponseComponent } from './response.component';
import { MockPipe } from 'app/mock-pipe';

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
      ],
      providers: [WindowRef]
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
