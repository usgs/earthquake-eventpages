import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundFailureLiquefactionBadgeComponent } from './ground-failure-liquefaction-badge.component';

describe('GroundFailureLiquefactionBadgeComponent', () => {
  let component: GroundFailureLiquefactionBadgeComponent;
  let fixture: ComponentFixture<GroundFailureLiquefactionBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundFailureLiquefactionBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundFailureLiquefactionBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
