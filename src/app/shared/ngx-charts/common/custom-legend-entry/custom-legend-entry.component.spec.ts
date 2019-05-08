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

  describe('icon', () => {
    it('sets', () => {
      const icon = {shape: 'circle', size: 6};
      component.icon = icon;

      expect(component._icon).toBe(icon);
      expect(component.icon).toBe(icon);
    });
    it('adds path for triangle', () => {
      component.icon = {shape: 'triangle', size: 6};

      expect(component.icon.path).toBeTruthy();
    });
  });

  describe('triangleTransform', () => {
    it('generates a transform', () => {
      const trans = component.triangleTransform(6);
      expect(trans).toBeTruthy();
    });
  });
});
