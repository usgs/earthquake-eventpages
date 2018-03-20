import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentTensorPinComponent } from './moment-tensor-pin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material';
import { MockComponent } from 'ng2-mock-component';
import { Mock } from 'protractor/built/driverProviders';
import { Tensor } from '../../shared/beachball/tensor';

describe('MomentTensorPinComponent', () => {
  let component: MomentTensorPinComponent;
  let fixture: ComponentFixture<MomentTensorPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        RouterTestingModule
      ],
      declarations: [
        MomentTensorPinComponent,

        MockComponent({
          selector: 'basic-pin',
          inputs: [
            'link',
            'product',
            'subtitle',
            'title'
          ]
        }),
        MockComponent({
          selector: 'shared-beachball',
          inputs: [
            'fillColor',
            'labelAxes',
            'labelPlanes',
            'tensor'
          ]
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentTensorPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('set product', () => {
    it('sets product and calls fromProduct', () => {
      const product = {id: 'test product'};
      const tensor = new Tensor({});
      spyOn(Tensor, 'fromProduct').and.returnValue(tensor);
      component.product = product;
      expect(component.product).toBe(product);
      expect(Tensor.fromProduct).toHaveBeenCalledWith(product);
      expect(component.tensor).toBe(tensor);
    });
  });
});
