import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessViewComponent } from './success-view.component';

describe('SuccessViewComponent', () => {
  let component: SuccessViewComponent;
  let fixture: ComponentFixture<SuccessViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessViewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessViewComponent);
    component = fixture.componentInstance;
    component.success = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
