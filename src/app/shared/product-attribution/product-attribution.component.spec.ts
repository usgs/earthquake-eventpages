import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { ProductAttributionComponent } from './product-attribution.component';

describe('ProductAttributionComponent', () => {
  let component: ProductAttributionComponent;
  let fixture: ComponentFixture<ProductAttributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductAttributionComponent,

        MockComponent({
          inputs: ['sourceCode'],
          selector: 'shared-attribution'
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getSources', () => {
    const productA = {
      source: 'a'
    };
    const productBB = {
      source: 'bb'
    };
    const productProperties = {
      properties: {
        'beachball-source': 'c',
        'magnitude-source': 'b',
        'origin-source': 'a'
      }
    };

    it('includes product source', () => {
      expect(component.getSources(productA)).toEqual(['a']);
      expect(component.getSources(productBB)).toEqual(['bb']);
    });

    it('transforms no sources', () => {
      const result = component.getSources(null);
      expect(result).toEqual([]);
    });

    it('checks product properties', () => {
      const result = component.getSources(productProperties);
      expect(result[0]).toBe('a');
      expect(result[1]).toBe('b');
      expect(result[2]).toBe('c');
    });

    it('is okay if product properties do not include alternate sources', () => {
      const result = component.getSources({ properties: {} });
      expect(result).toEqual([]);
    });
  });
});
