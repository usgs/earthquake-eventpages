import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakeAlertPendingComponent } from './shake-alert-pending.component';

describe('ShakeAlertPendingComponent', () => {
  let component: ShakeAlertPendingComponent;
  let fixture: ComponentFixture<ShakeAlertPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShakeAlertPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeAlertPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
