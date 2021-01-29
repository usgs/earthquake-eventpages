import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundFailureLandslideIconComponent } from './ground-failure-landslide-icon.component';

describe('GroundFailureLandslideIconComponent', () => {
  let component: GroundFailureLandslideIconComponent;
  let fixture: ComponentFixture<GroundFailureLandslideIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundFailureLandslideIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundFailureLandslideIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
