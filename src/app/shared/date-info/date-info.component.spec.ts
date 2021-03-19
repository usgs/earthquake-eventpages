import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateInfoComponent } from './date-info.component';

describe('DateInfoComponent', () => {
  let component: DateInfoComponent;
  let fixture: ComponentFixture<DateInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
