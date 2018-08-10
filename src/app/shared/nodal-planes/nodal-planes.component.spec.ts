import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material';

import { MockPipe } from '../../mock-pipe';
import { Tensor } from '../../shared/beachball/tensor';
import { NodalPlanesComponent } from './nodal-planes.component';


describe('NodalPlanesComponent', () => {
  let component: NodalPlanesComponent;
  let fixture: ComponentFixture<NodalPlanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule
      ],
      declarations: [
        NodalPlanesComponent,

        MockPipe('sharedDegrees')
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
      expect(planes).toEqual([tensor.NP1, tensor.NP2]);
    });
  });
});

