import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginSummaryComponent } from './origin-summary.component';

describe('OriginSummaryComponent', () => {
  let component: OriginSummaryComponent;
  let fixture: ComponentFixture<OriginSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
