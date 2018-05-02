import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsesVsTimeComponent } from './responses-vs-time.component';

describe('ResponsesVsTimeComponent', () => {
  let component: ResponsesVsTimeComponent;
  let fixture: ComponentFixture<ResponsesVsTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsesVsTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsesVsTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
