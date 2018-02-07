import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownEventPageComponent } from './unknown-event-page.component';

describe('UnknownEventPageComponent', () => {
  let component: UnknownEventPageComponent;
  let fixture: ComponentFixture<UnknownEventPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnknownEventPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnknownEventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
