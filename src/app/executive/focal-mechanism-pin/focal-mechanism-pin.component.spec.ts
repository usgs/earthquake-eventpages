import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';
import { Mock } from 'protractor/built/driverProviders';
import { MockComponent } from 'ng2-mock-component';
import { RouterTestingModule } from '@angular/router/testing';

import { FocalMechanismPinComponent } from './focal-mechanism-pin.component';
import { Tensor } from '../../shared/beachball/tensor';


describe('FocalMechanismPinComponent', () => {
  let component: FocalMechanismPinComponent;
  let fixture: ComponentFixture<FocalMechanismPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        RouterTestingModule
      ],
      declarations: [
        FocalMechanismPinComponent,

        MockComponent({
          selector: 'basic-pin',
          inputs: [
            'action',
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
    fixture = TestBed.createComponent(FocalMechanismPinComponent);
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
