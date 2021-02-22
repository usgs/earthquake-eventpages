import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';

import { MockComponent } from 'ng2-mock-component';

import { MockPipe } from '../../mock-pipe';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,

        MockComponent({
          inputs: ['product', 'event'],
          selector: 'product-page-summary-link'
        }),
        MockComponent({
          inputs: ['product'],
          selector: 'shared-product-attribution'
        }),
        MockComponent({
          inputs: ['productType', 'event'],
          selector: 'shared-summary-link'
        }),

        MockPipe('dateTime'),
        MockPipe('isScenarioEvent'),
        MockPipe('sharedGetProducts'),
        MockPipe('sharedProductProperty'),
        MockPipe('sharedProductReviewed')
      ],
      imports: [MatExpansionModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isPreferred', () => {
    const product = {
      id: 1,
      type: 'origin'
    };
    const event = {
      properties: {
        products: {
          origin: [product]
        }
      }
    };

    expect(component.isPreferred(event, product)).toBeTruthy();
    expect(component.isPreferred(event, { type: 'phase-data' })).toBeFalsy();
    expect(component.isPreferred(event, { id: 2, type: 'origin' })).toBeFalsy();
  });
});
