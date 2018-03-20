import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributionComponent } from './attribution.component';

describe('AttributionComponent', () => {
  let component: AttributionComponent;
  let fixture: ComponentFixture<AttributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
