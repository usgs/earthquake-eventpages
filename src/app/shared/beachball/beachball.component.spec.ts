import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeachballComponent } from './beachball.component';

describe('BeachballComponent', () => {
  let component: BeachballComponent;
  let fixture: ComponentFixture<BeachballComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeachballComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeachballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
