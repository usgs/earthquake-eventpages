import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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

        MockPipe('dateTime')
      ]
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

  it('isReviewed', () => {
    const status = 'reviewed';
    const product = {
      properties: {
        'review-status': status
      },
      type: 'origin'
    };

    expect(component.isReviewed(product)).toBeTruthy();
    expect(
      component.isReviewed({ properties: { 'happy-status': 'reviewed' } })
    ).toBeFalsy();
    expect(
      component.isReviewed({ properties: { 'review-status': 'NOT REVIEWED' } })
    ).toBeFalsy();
  });
});
