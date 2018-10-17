import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundFailureTypeComponent } from './ground-failure-type.component';

describe('GroundFailureTypeComponent', () => {
  let component: GroundFailureTypeComponent;
  let fixture: ComponentFixture<GroundFailureTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundFailureTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundFailureTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
