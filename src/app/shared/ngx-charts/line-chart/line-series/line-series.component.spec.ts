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
          ]
        }),
        selector: ':svg:g'
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
});
