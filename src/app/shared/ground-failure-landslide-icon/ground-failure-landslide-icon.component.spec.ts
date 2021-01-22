import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundfailureLandslideIconComponent } from './groundfailure-landslide-icon.component';

describe('GroundfailureLandslideIconComponent', () => {
  let component: GroundfailureLandslideIconComponent;
  let fixture: ComponentFixture<GroundfailureLandslideIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundfailureLandslideIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundfailureLandslideIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
