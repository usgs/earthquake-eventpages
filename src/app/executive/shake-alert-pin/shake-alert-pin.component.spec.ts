import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakeAlertPinComponent } from './shake-alert-pin.component';

describe('ShakeAlertPinComponent', () => {
  let component: ShakeAlertPinComponent;
  let fixture: ComponentFixture<ShakeAlertPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShakeAlertPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeAlertPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
