import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { LineSeriesComponent } from './line-series.component';

describe('LineSeriesComponent', () => {
  let component: LineSeriesComponent;
  let fixture: ComponentFixture<LineSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LineSeriesComponent,

        MockComponent({
          inputs: [
            'data',
            'path',
            'stroke',
            'strokeWidth',
            'animations',
            'fill',
            'opacity',
            'startOpacity',
            'name',
            'stops',
            'gradient'
          ],
          selector: ':svg:g'
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sortData', () => {
    it('should sort data', () => {
      let data = [
        {'prop': 2}, {'prop': 1}, {'prop': 3}
      ];

      data = component.sortData(data, 'prop');
      expect(data[0].prop).toBe(1);
      expect(data[1].prop).toBe(2);
      expect(data[2].prop).toBe(3);
    });

    it('should can sort descending', () => {
      let data = [
        {'prop': 2}, {'prop': 1}, {'prop': 3}
      ];

      data = component.sortData(data, 'prop', false);
      expect(data[0].prop).toBe(3);
      expect(data[1].prop).toBe(2);
      expect(data[2].prop).toBe(1);
    });
  });
});
