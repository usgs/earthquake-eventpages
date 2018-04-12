import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationFlagComponent } from './station-flag.component';

describe('StationFlagComponent', () => {
  let component: StationFlagComponent;
  let fixture: ComponentFixture<StationFlagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationFlagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
