import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxesComponent } from './axes.component';
import { MatTableModule } from '@angular/material';
import { Tensor } from '../../shared/beachball/tensor';

describe('AxesComponent', () => {
  let component: AxesComponent;
  let fixture: ComponentFixture<AxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule
      ],
      declarations: [
        AxesComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getAxes', () => {
    it('returns an empty array', () => {
      expect(component.getAxes(null)).toEqual([]);
    });

    it('calculates axis values correctly', () => {
      const tensor = Tensor.fromProduct({
        id: 'urn:usgs-product:us:moment-tensor:us_2000cjfy_mww:1519977554040',
        type: 'moment-tensor',
        properties: {
          'tensor-mpp': '-2.3267E+19',
          'tensor-mrp': '-7.68E+18',
          'tensor-mrr': '5.3766E+19',
          'tensor-mrt': '1.0445E+19',
          'tensor-mtp': '3.4237E+19',
          'tensor-mtt': '-3.0499E+19'
        }
      });

      const axes = component.getAxes(tensor);
      console.log(axes);
      const t = axes[0];
      expect(t.name).toEqual('T');
      expect(t.azimuth.toFixed(1)).toEqual('28.4');
      expect(t.plunge.toFixed(1)).toEqual('83.5');
      expect(t.value.toFixed(3)).toEqual('5.523');
      expect(t.exponent).toEqual(19);

      const n = axes[1];
      expect(n.name).toEqual('N');
      expect(n.azimuth.toFixed(1)).toEqual('131.7');
      expect(n.plunge.toFixed(1)).toEqual('1.5');
      expect(n.value.toFixed(3)).toEqual('0.751');
      expect(n.exponent).toEqual(19);

      const p = axes[2];
      expect(p.name).toEqual('P');
      expect(p.azimuth.toFixed(1)).toEqual('221.9');
      expect(p.plunge.toFixed(1)).toEqual('6.3');
      expect(p.value.toFixed(3)).toEqual('-6.274');
      expect(p.exponent).toEqual(19);
    });
  });
});
