import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DyfiComponent } from './dyfi.component';

describe('DyfiComponent', () => {
  let component: DyfiComponent;
  let fixture: ComponentFixture<DyfiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DyfiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
