import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundFailurePinComponent } from './ground-failure-pin.component';

describe('GroundFailurePinComponent', () => {
  let component: GroundFailurePinComponent;
  let fixture: ComponentFixture<GroundFailurePinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundFailurePinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundFailurePinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
