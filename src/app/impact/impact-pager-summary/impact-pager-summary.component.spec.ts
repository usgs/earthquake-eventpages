import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactPagerSummaryComponent } from './impact-pager-summary.component';

describe('ImpactPagerSummaryComponent', () => {
  let component: ImpactPagerSummaryComponent;
  let fixture: ComponentFixture<ImpactPagerSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpactPagerSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactPagerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
