import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalPinComponent } from './regional-pin.component';

describe('RegionalPinComponent', () => {
  let component: RegionalPinComponent;
  let fixture: ComponentFixture<RegionalPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
