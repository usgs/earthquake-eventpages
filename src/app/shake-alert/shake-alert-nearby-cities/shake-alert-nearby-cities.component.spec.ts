import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakeAlertNearbyCitiesComponent } from './shake-alert-nearby-cities.component';

describe('ShakeAlertNearbyCitiesComponent', () => {
  let component: ShakeAlertNearbyCitiesComponent;
  let fixture: ComponentFixture<ShakeAlertNearbyCitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShakeAlertNearbyCitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeAlertNearbyCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
