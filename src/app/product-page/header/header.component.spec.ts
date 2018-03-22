import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MockPipe } from '../../mock-pipe';
import { MockComponent } from 'ng2-mock-component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,

        MockComponent({selector: 'shared-product-attribution', inputs: ['product']}),
        MockPipe('dateTime')
      ]
    })
    .compileComponents();
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
          origin: [
            product
          ]
        }
      }
    };

    expect(component.isPreferred(event, product)).toBeTruthy();
    expect(component.isPreferred(event, {type: 'phase-data'})).toBeFalsy();
    expect(component.isPreferred(event, {id: 2, type: 'origin'})).toBeFalsy();
  });

  it('isReviewed', () => {
    const status = 'reviewed';
    const product = {
      properties: {
        'review-status': status
      }
    }

    expect(component.isReviewed(product)).toBeTruthy();
    expect(component.isReviewed({properties: {'happy-status': 'reviewed'}})).toBeFalsy();
    expect(component.isReviewed({properties: {'review-status': 'NOT REVIEWED'}})).toBeFalsy();
  });
});
