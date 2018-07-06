import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockPipe } from '../../mock-pipe';

import { SummaryLinkComponent } from './summary-link.component';



describe('SummaryLinkComponent', () => {
  let component: SummaryLinkComponent;
  let fixture: ComponentFixture<SummaryLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SummaryLinkComponent,

        MockPipe('link')
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return single product text', () => {
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

    expect(component.linkText(event, product, 'origin')).toEqual('Back to origin');
  });

  it('should return multi product text', () => {
    const product = {
      id: 1,
      type: 'origin'
    };

    const event = {
      properties: {
        products: {
          origin: [
            {product},
            {product}
          ]
        }
      }
    };

    expect(component.linkText(event, product, 'origin')).toEqual('View alternative origin (2 total)');
  });
});
