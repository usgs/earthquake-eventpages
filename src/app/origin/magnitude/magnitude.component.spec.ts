import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagnitudeComponent } from './magnitude.component';

describe('MagnitudeComponent', () => {
  let component: MagnitudeComponent;
  let fixture: ComponentFixture<MagnitudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagnitudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagnitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
