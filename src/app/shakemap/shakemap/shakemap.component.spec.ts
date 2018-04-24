import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { ShakemapComponent } from './shakemap.component';
import { Event } from '../../event';
import { EventService } from '../../core/event.service';

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

        MockComponent({selector: 'product-page', inputs: ['productType']})
      ],
      imports: [
        MatTabsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub }
      ]
    })
    .compileComponents();
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
