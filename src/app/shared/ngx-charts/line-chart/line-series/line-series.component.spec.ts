import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineSeriesComponent } from './line-series.component';

describe('LineSeriesComponent', () => {
  let component: LineSeriesComponent;
  let fixture: ComponentFixture<LineSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
