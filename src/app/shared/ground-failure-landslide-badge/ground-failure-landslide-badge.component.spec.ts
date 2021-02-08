import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundFailureLandslideBadgeComponent } from './ground-failure-landslide-badge.component';

describe('GroundFailureLandslideBadgeComponent', () => {
  let component: GroundFailureLandslideBadgeComponent;
  let fixture: ComponentFixture<GroundFailureLandslideBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundFailureLandslideBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundFailureLandslideBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
