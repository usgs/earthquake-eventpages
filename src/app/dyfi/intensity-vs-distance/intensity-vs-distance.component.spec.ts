import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntensityVsDistanceComponent } from './intensity-vs-distance.component';

describe('IntensityVsDistanceComponent', () => {
  let component: IntensityVsDistanceComponent;
  let fixture: ComponentFixture<IntensityVsDistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntensityVsDistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntensityVsDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
