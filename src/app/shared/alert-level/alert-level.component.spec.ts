import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertLevelComponent } from './alert-level.component';

describe('AlertLevelComponent', () => {
  let component: AlertLevelComponent;
  let fixture: ComponentFixture<AlertLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
