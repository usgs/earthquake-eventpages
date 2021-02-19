import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { ContributorService } from '@core/contributor.service';
import { EventService } from '@core/event.service';
import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';
import { BasicPinComponent } from './basic-pin.component';

describe('BasicPinComponent', () => {
  let component: BasicPinComponent;
  let fixture: ComponentFixture<BasicPinComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({})),
      getProduct: jasmine.createSpy('eventService::getProduct')
    };

    const contributorServiceStub = {
      contributors$: of({})
    };

    TestBed.configureTestingModule({
      declarations: [
        BasicPinComponent,

        MockComponent({
          inputs: ['product'],
          selector: 'shared-product-attribution'
        }),
        MockPipe('contributorList')
      ],
      imports: [
        MatListModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        RouterTestingModule
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub },
        { provide: ContributorService, useValue: contributorServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
