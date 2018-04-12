import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundFailureComponent } from './ground-failure.component';

describe('GroundFailureComponent', () => {
  let component: GroundFailureComponent;
  let fixture: ComponentFixture<GroundFailureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundFailureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
