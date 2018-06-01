import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedBubbleSeriesComponent } from './bubble-series.component';

describe('ExtendedBubbleSeriesComponent', () => {
  let component: ExtendedBubbleSeriesComponent;
  let fixture: ComponentFixture<ExtendedBubbleSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedBubbleSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedBubbleSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
