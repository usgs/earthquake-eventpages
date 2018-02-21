import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakeMapSummaryComponent } from './shake-map-summary.component';

describe('ShakeMapSummaryComponent', () => {
  let component: ShakeMapSummaryComponent;
  let fixture: ComponentFixture<ShakeMapSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShakeMapSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeMapSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
