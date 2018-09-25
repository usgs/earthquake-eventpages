import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';

import { MockPipe } from '../../mock-pipe';
import { PagerPinComponent } from './pager-pin.component';

describe('PagerPinComponent', () => {
  let component: PagerPinComponent;
  let fixture: ComponentFixture<PagerPinComponent>;
  let product, spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PagerPinComponent,

        MockComponent({
          inputs: ['link', 'product', 'title'],
          selector: 'basic-pin'
        }),
        MockComponent({
          inputs: ['alert'],
          selector: 'shared-alert-level'
        }),

        MockPipe('sharedProductContent')
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    product = {
      properties: {
        alertlevel: 'pending'
      }
    };

    fixture = TestBed.createComponent(PagerPinComponent);
    component = fixture.componentInstance;

    component.product = product;
    component.link = 'myUrl';

    spy = spyOn(component, 'isPending').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have pending set', () => {
    expect(component.product.properties.alertlevel).toEqual('pending');
  });

  it('should have pending set to true', () => {
    expect(component.pending).toBeTruthy();
  });

  it('should have ngOnInit call the isPending function', () => {
    expect(spy).toHaveBeenCalled();
  });

  it('should return true', () => {
    const value = component.isPending();
    expect(value).toBe(true);
  });

  it('should return false', () => {
    const newProduct = product;
    newProduct.properties.alertlevel = 'yellow';
    component.product = newProduct;
    const value = component.isPending();
    expect(value).toBe(false);
  });
});
