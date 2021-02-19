import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTabsModule } from '@angular/material/tabs';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';
import { ShakemapComponent } from './shakemap.component';

describe('ShakemapComponent', () => {
  let component: ShakemapComponent;
  let fixture: ComponentFixture<ShakemapComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({})),
      product$: null
    };

    TestBed.configureTestingModule({
      declarations: [
        ShakemapComponent,

        MockComponent({
          inputs: ['productType', 'showVersion'],
          selector: 'product-page'
        }),
        MockComponent({
          inputs: ['event'],
          selector: 'technical-origin-summary'
        }),
        MockComponent({
          inputs: ['event', 'products'],
          selector: 'impact-shakemap-summary'
        }),

        MockPipe('sharedGetProducts'),
        MockPipe('sharedProductContent')
      ],
      imports: [MatTabsModule, RouterTestingModule],
      providers: [{ provide: EventService, useValue: eventServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
