import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodalPlanesComponent } from './nodal-planes.component';
import { MatTableModule } from '@angular/material';
import { Tensor } from '../../shared/beachball/tensor';

describe('NodalPlanesComponent', () => {
  let component: NodalPlanesComponent;
  let fixture: ComponentFixture<NodalPlanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule
      ],
      declarations: [
        NodalPlanesComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodalPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getPlanes', () => {
    it('returns an empty array', () => {
      expect(component.getPlanes(null)).toEqual([]);
    });

    it('returns the planes', () => {
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

      const planes = component.getPlanes(tensor);
      expect(planes[0].name).toEqual('NP1');
      expect(planes[0].strike).toEqual(tensor.NP1.strike);
      expect(planes[0].dip).toEqual(tensor.NP1.dip);
      expect(planes[0].rake).toEqual(tensor.NP1.rake);
      expect(planes[1].name).toEqual('NP2');
      expect(planes[1].strike).toEqual(tensor.NP2.strike);
      expect(planes[1].dip).toEqual(tensor.NP2.dip);
      expect(planes[1].rake).toEqual(tensor.NP2.rake);
    });
  });
});
