import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundFailureLiquifactionIconComponent } from './ground-failure-liquifaction-icon.component';

describe('GroundFailureLiquifactionIconComponent', () => {
  let component: GroundFailureLiquifactionIconComponent;
  let fixture: ComponentFixture<GroundFailureLiquifactionIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundFailureLiquifactionIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundFailureLiquifactionIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
