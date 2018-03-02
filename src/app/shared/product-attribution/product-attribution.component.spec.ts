import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributionComponent } from './product-attribution.component';
import { ContributorService } from '../../contributor.service';
import { EventService } from '../../event.service';
import { Event } from '../../event';

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

  describe('getSources', () => {
    const event = new Event({
      properties: {
        sources: ',bb,a,'
      }
    });
    const details = [
      {
        id: 'a',
        title: 'A Title',
        url: 'a-url',
        aliases: null
      },
      {
        id: 'b',
        title: 'B Title',
        url: 'b-url',
        aliases: ['bb']
      }
    ];
    const productA = {
      source: 'a'
    };
    const productBB = {
      source: 'bb'
    };
    const productC = {
      source: 'c'
    };
    const productProperties = {
      properties: {
        'origin-source': 'a',
        'magnitude-source': 'b',
        'beachball-source': 'c'
      }
    };

    it('transforms with no detailsMap', () => {
      const resultA = component.getSources(productA, event);
      const resultBB = component.getSources(productBB, event);
      const resultC = component.getSources(productC, event);

      expect(resultA).toEqual([{ id: 'A', details: undefined, index: 1 }]);
      expect(resultBB).toEqual([{ id: 'BB', details: undefined, index: 2 }]);
      expect(resultC).toEqual([{ id: 'C', details: undefined, index: 0 }]);
    });

    it('transforms with a detailsMap', () => {
      let result = component.getSources(productA, event, details);
      expect(result).toEqual([{ id: 'A', details: details[0], index: 1 }]);

      result = component.getSources(productBB, event, details);
      expect(result).toEqual([{ id: 'BB', details: details[1], index: 2 }]);
    });

    it('transforms no sources', () => {
      const result = component.getSources(null);
      expect(result).toEqual([]);
    });

    it('checks product properties', () => {
      const result = component.getSources(productProperties);
      expect(result[0].id).toBe('A');
      expect(result[1].id).toBe('B');
      expect(result[2].id).toBe('C');
    });

    it('is okay if product properties do not include alternate sources', () => {
      const result = component.getSources({properties: {}});
      expect(result).toEqual([]);
    });
  });
});
