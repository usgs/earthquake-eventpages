import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagerCitiesComponent } from './pager-cities.component';

describe('PagerCitiesComponent', () => {
  let component: PagerCitiesComponent;
  let fixture: ComponentFixture<PagerCitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagerCitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagerCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
