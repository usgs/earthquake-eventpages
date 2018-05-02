import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagerPopulationComponent } from './pager-population.component';

describe('PagerPopulationComponent', () => {
  let component: PagerPopulationComponent;
  let fixture: ComponentFixture<PagerPopulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagerPopulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagerPopulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
