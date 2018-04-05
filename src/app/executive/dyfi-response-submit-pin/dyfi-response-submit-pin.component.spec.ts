import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DyfiResponseSubmitPinComponent } from './dyfi-response-submit-pin.component';

describe('DyfiResponseSubmitPinComponent', () => {
  let component: DyfiResponseSubmitPinComponent;
  let fixture: ComponentFixture<DyfiResponseSubmitPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DyfiResponseSubmitPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyfiResponseSubmitPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
