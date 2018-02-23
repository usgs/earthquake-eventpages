import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagerSummaryComponent } from './pager-summary.component';

describe('PagerSummaryComponent', () => {
  let component: PagerSummaryComponent;
  let fixture: ComponentFixture<PagerSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagerSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
