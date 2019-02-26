import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorResponseComponent } from './error-response.component';

describe('ErrorResponseComponent', () => {
  let component: ErrorResponseComponent;
  let fixture: ComponentFixture<ErrorResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
