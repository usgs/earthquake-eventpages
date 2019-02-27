import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLegendEntryComponent } from './custom-legend-entry.component';

describe('CustomLegendEntryComponent', () => {
  let component: CustomLegendEntryComponent;
  let fixture: ComponentFixture<CustomLegendEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomLegendEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLegendEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
