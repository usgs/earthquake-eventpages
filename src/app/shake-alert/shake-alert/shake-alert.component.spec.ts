import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakeAlertComponent } from './shake-alert.component';

describe('ShakeAlertComponent', () => {
  let component: ShakeAlertComponent;
  let fixture: ComponentFixture<ShakeAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShakeAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
