import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EventService } from '@core/event.service';
import { WildcardComponent } from './wildcard.component';

describe('WildcardComponent', () => {
  let component: WildcardComponent;
  let fixture: ComponentFixture<WildcardComponent>;
  let event1: any, event2: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WildcardComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [EventService]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WildcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    event1 = {
      data: {
        properties: {
          products: {
            'finite-fault': {},
            'ground-failure': {},
            losspager: {},
            'moment-tensor': {},
            origin: {},
            shakemap: {}
          }
        }
      },
      id: 'us1000dyad'
    };

    event2 = {
      data: {
        properties: {
          products: {
            'ground-failure': {},
            losspager: {},
            'moment-tensor': {},
            oaf: {},
            origin: {},
            shakemap: {}
          }
        }
      },
      id: 'ak20076877'
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be created', inject([EventService], (service: EventService) => {
    expect(service).toBeTruthy();
  }));

  it('should spy on setSuggestion', () => {
    spyOn(component, 'setSuggestion');
    component.setSuggestion('test');
    expect(component.setSuggestion).toHaveBeenCalled();
  });

  it('should set suggestionUrl and suggestionString properties', () => {
    component.eventId = event1.id;
    component.setSuggestion('test');
    expect(component.suggestionString).toEqual('test');
    expect(component.suggestionStringUrl).toEqual('/us1000dyad/test');
  });

  it('should build a products array from event1 and event2', () => {
    component.buildProductsArray(event1);
    let productsArr = component.products;
    expect(productsArr).toEqual([
      'executive',
      'map',
      'region-info',
      'tellus',
      'impact',
      'dyfi',
      'technical',
      'waveforms',
      'finite-fault',
      'ground-failure',
      'pager',
      'moment-tensor',
      'origin',
      'shakemap'
    ]);
    component.products = [
      'executive',
      'map',
      'region-info',
      'tellus',
      'impact',
      'dyfi',
      'technical',
      'waveforms'
    ];
    component.buildProductsArray(event2);
    productsArr = component.products;
    expect(productsArr).toEqual([
      'executive',
      'map',
      'region-info',
      'tellus',
      'impact',
      'dyfi',
      'technical',
      'waveforms',
      'ground-failure',
      'pager',
      'moment-tensor',
      'oaf',
      'origin',
      'shakemap'
    ]);
  });

  it('should return shakemap', () => {
    component.buildProductsArray(event1);
    const match = component.getMatch('shakemop', component.products);
    expect(match.bestMatch.target).toEqual('shakemap');
  });

  it('should set finite-fault as the final link and url', () => {
    component.eventId = event1.id;
    component.buildProductsArray(event1);
    component.urlMatch = 'finitefolt';
    component.getStringSimilarity();
    expect(component.suggestionString).toEqual('finite-fault');
    expect(component.suggestionStringUrl).toEqual(`/${event1.id}/finite-fault`);
  });
});
