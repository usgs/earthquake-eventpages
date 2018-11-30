import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakeAlertMissedComponent } from './shake-alert-missed.component';

describe('ShakeAlertMissedComponent', () => {
  let component: ShakeAlertMissedComponent;
  let fixture: ComponentFixture<ShakeAlertMissedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShakeAlertMissedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeAlertMissedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
