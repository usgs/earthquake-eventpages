import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentTensorSummaryComponent } from './moment-tensor-summary.component';
import { MockComponent } from 'ng2-mock-component';
import { MatTableModule, MatIconModule } from '@angular/material';
import { FormatterService } from '../../formatter.service';
import { Tensor } from '../../shared/beachball/tensor';

describe('MomentTensorSummaryComponent', () => {
  let component: MomentTensorSummaryComponent;
  let fixture: ComponentFixture<MomentTensorSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatTableModule
      ],
      declarations: [
        MomentTensorSummaryComponent,

        MockComponent({selector: 'shared-beachball', inputs: ['fillColor', 'labelAxes', 'labelPlanes', 'size', 'tensor']}),
        MockComponent({selector: 'shared-product-attribution', inputs: ['product']})
      ],
      providers: [
        FormatterService
      ]
    })
    .compileComponents();
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
      spyOn(Tensor, 'fromProduct').and.returnValues({id: 1}, {id: 'b'});
      component.products = [{}, {}];
      expect(component.tensors).toEqual([{id: 1}, {id: 'b'}]);
    });

    it('clears tensors', () => {
      component.tensors = [{}, {}];
      component.products = null;
      expect(component.tensors).toEqual([]);
    });

  });
});
