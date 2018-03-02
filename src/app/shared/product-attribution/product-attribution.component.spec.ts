import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributionComponent } from './product-attribution.component';
import { ContributorService } from '../../contributor.service';
import { EventService } from '../../event.service';

describe('ProductAttributionComponent', () => {
  let component: ProductAttributionComponent;
  let fixture: ComponentFixture<ProductAttributionComponent>;

  beforeEach(async(() => {
    const contributorServiceStub = {
      getContributors: jasmine.createSpy('contributorService::getContributors')
    };

    const eventServiceStub = {
      getEvent: jasmine.createSpy('eventService::getEvent')
    };

    TestBed.configureTestingModule({
      declarations: [
        ProductAttributionComponent
      ],
      providers: [
        {provide: ContributorService, useValue: contributorServiceStub},
        {provide: EventService, useValue: eventServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
