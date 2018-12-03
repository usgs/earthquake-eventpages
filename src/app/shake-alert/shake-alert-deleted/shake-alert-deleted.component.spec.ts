import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakeAlertDeletedComponent } from './shake-alert-deleted.component';

describe('ShakeAlertDeletedComponent', () => {
  let component: ShakeAlertDeletedComponent;
  let fixture: ComponentFixture<ShakeAlertDeletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShakeAlertDeletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeAlertDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
