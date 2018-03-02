import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPinComponent } from './basic-pin.component';

describe('BasicPinComponent', () => {
  let component: BasicPinComponent;
  let fixture: ComponentFixture<BasicPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
