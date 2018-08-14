import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { MockComponent } from 'ng2-mock-component';

import { FormatterService } from '@core/formatter.service';
import { Tensor } from '@shared/beachball/tensor';
import { MomentTensorSummaryComponent } from './moment-tensor-summary.component';

describe('MomentTensorSummaryComponent', () => {
  let component: MomentTensorSummaryComponent;
  let fixture: ComponentFixture<MomentTensorSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MomentTensorSummaryComponent,
        MockComponent({
          inputs: ['fillColor', 'labelAxes', 'labelPlanes', 'size', 'tensor'],
          selector: 'shared-beachball'
        }),
        MockComponent({
          inputs: ['product'],
          selector: 'shared-product-attribution'
        }),
        MockComponent({
          inputs: ['TITLE'],
          selector: 'shared-preferred-check'
        })
      ],
      imports: [MatIconModule, MatTableModule, RouterModule],
      providers: [FormatterService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentTensorSummaryComponent);
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
