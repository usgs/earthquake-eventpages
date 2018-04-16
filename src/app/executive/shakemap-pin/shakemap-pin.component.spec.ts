import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { MockPipe } from '../../mock-pipe';
import { ShakemapPinComponent } from './shakemap-pin.component';

describe('ShakemapPinComponent', () => {
  let component: ShakemapPinComponent;
  let fixture: ComponentFixture<ShakemapPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShakemapPinComponent,
        MockComponent({selector: 'basic-pin', inputs: ['link', 'product', 'title']}),
        MockComponent({selector: 'shared-mmi', inputs: ['intensity']}),
        MockComponent({selector: 'shared-map', inputs: ['overlays', 'showAttributionControl']}),

        MockPipe('shakemapMapOverlays')
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakemapPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sets event', () => {
    const product = {type: 'shakemap'};
    const event = {
      type: 'event',
      getProduct: (prod) => {
        return product;
      }
    };
    component.event = event;

    expect(component._event).toEqual(event);
    expect(component.product).toEqual(product);

  });

  it('handles null event', () => {
    component.event = null;

    expect(component._event).toEqual(null);
    expect(component.product).toBeUndefined();

  });
});
