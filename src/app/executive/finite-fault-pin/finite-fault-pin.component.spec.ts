import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiniteFaultPinComponent } from './finite-fault-pin.component';

describe('FiniteFaultPinComponent', () => {
  let component: FiniteFaultPinComponent;
  let fixture: ComponentFixture<FiniteFaultPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiniteFaultPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiniteFaultPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
