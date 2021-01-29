import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundFailureLiquefactionIconComponent } from './ground-failure-liquefaction-icon.component';

describe('GroundFailureLiquefactionIconComponent', () => {
  let component: GroundFailureLiquefactionIconComponent;
  let fixture: ComponentFixture<GroundFailureLiquefactionIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundFailureLiquefactionIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundFailureLiquefactionIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
