import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakeAlertMapComponent } from './shake-alert-map.component';

describe('ShakeAlertMapComponent', () => {
  let component: ShakeAlertMapComponent;
  let fixture: ComponentFixture<ShakeAlertMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShakeAlertMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeAlertMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
