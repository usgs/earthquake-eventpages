import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DyfisummaryComponent } from './dyfisummary.component';

describe('DyfisummaryComponent', () => {
  let component: DyfisummaryComponent;
  let fixture: ComponentFixture<DyfisummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DyfisummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyfisummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
