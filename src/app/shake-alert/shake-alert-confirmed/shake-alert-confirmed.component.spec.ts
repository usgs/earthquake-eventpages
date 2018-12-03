import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakeAlertConfirmedComponent } from './shake-alert-confirmed.component';

describe('ShakeAlertConfirmedComponent', () => {
  let component: ShakeAlertConfirmedComponent;
  let fixture: ComponentFixture<ShakeAlertConfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShakeAlertConfirmedComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeAlertConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
