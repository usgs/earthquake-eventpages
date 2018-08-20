import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { MockComponent } from 'ng2-mock-component';
import { MockPipe } from '../../mock-pipe';

import { Tensor } from '@shared/beachball/tensor';
import { FocalMechanismSummaryComponent } from './focal-mechanism-summary.component';

describe('FocalMechanismSummaryComponent', () => {
  let component: FocalMechanismSummaryComponent;
  let fixture: ComponentFixture<FocalMechanismSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FocalMechanismSummaryComponent,
        MockComponent({
          inputs: ['fillColor', 'labelAxes', 'labelPlanes', 'size', 'tensor'],
          selector: 'shared-beachball'
        }),
        MockComponent({
          inputs: ['product'],
          selector: 'shared-product-attribution'
        }),
        MockPipe('sharedDegrees')
      ],
      imports: [MatIconModule, MatTableModule, RouterModule],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocalMechanismSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('set products', () => {
    it('populates tensors', () => {
      spyOn(Tensor, 'fromProduct').and.returnValues({ id: 1 }, { id: 'b' });
      component.products = [{}, {}];
      expect(component.tensors).toEqual([{ id: 1 }, { id: 'b' }]);
    });

    it('clears tensors', () => {
      component.tensors = [{}, {}];
      component.products = null;
      expect(component.tensors).toEqual([]);
    });
  });
});
