import { Component, OnInit } from '@angular/core';

import * as stringSimilarity from 'string-similarity';

import { EventService } from '@core/event.service';

/**
 * Wildcard component. This route will load if a valid event is returned with a
 *  mistyped/malformed url endpoint after the event
 */
@Component({
  selector: 'wildcard',
  styleUrls: ['./wildcard.component.scss'],
  templateUrl: './wildcard.component.html'
})
export class WildcardComponent implements OnInit {
  event$: any;
  eventId: string;
  productPagesComparator = {
    'finite-fault': 'finite-fault',
    'focal-mechanism': 'focal-mechanism',
    'ground-failure': 'ground-failure',
    losspager: 'pager',
    'moment-tensor': 'moment-tensor',
    oaf: 'oaf',
    origin: 'origin',
    shakemap: 'shakemap'
  };
  products = [
    'executive',
    'map',
    'region-info',
    'tellus',
    'impact',
    'dyfi',
    'technical',
    'waveforms'
  ];
  suggestionString;
  suggestionStringUrl;
  urlMatch: string;

  constructor(public eventService: EventService) {}

  /**
   * Builds a products array based on the products that come in from the event,
   *    plus other products that show up in the left hand navigation on all
   *    product pages
   *
   * @param event
   *     The event
   */
  buildProductsArray(event: any): void {
    // Strip property values from the json data and our comparator object
    const eventKeys = Object.keys(event.data.properties.products);
    const comparatorKeys = Object.keys(this.productPagesComparator);

    eventKeys.filter(product => {
      // If the name of the product is in our comparator object, we will add
      //    it to our products array
      if (comparatorKeys.includes(product)) {
        this.products.push(this.productPagesComparator[product]);
      }
    });
  }

  /**
   * Calls the string-similarity library imported above to find the weight
   *    between the mistyped url endpoint, and possible suggestions
   *
   * @param url
   *     The mistyped URL endpoint
   * @param products
   *     The products array of all possible links/products on this event
   * @returns
   *     An object with the best match and it's weighted value based on number
   *        of substitutions/swaps/deletes
   */
  getMatch(url: string, products: string[]): any {
    return stringSimilarity.findBestMatch(url, products);
  }

  /**
   * Calls on the string-similarity package to check the mistyped url
   */
  getStringSimilarity(): void {
    try {
      // Run the url endpoint into the similarity function against all strings
      //    in the products array, to see if there is a match. If there
      //    are no matches within the given weight limit, the suggestion url
      //    is defaulted to the executive page for this event
      const match = this.getMatch(this.urlMatch, this.products);
      if (match.bestMatch) {
        const bestMatch = match.bestMatch;
        if (bestMatch.rating >= 0.5) {
          this.setSuggestion(bestMatch.target);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  ngOnInit() {
    this.splitUrl();
    this.eventService.event$.subscribe(event => {
      if (event.data) {
        this.eventId = event.id;
        // Set the default suggestion to executive in case the string compare
        //    function does not work or the event properties aren't correct
        this.setSuggestion('executive');
        // Create products array based on static products and ones that come in
        //    from the json
        this.buildProductsArray(event);
        // Run the similarity logic
        this.getStringSimilarity();
      }
    });
  }

  /**
   * Helper function to set the string for the wording of the page link
   *
   * @param suggestion
   *     The suggestion word returned from the getMatch functions return object
   */
  setSuggestion(suggestion: string): void {
    if (!suggestion) {
      this.suggestionString = 'executive';
      this.setSuggestionUrl('executive');
    } else {
      if (suggestion === 'tellus') {
        this.suggestionString = 'tell-us';
        this.setSuggestionUrl('tellus');
      } else {
        this.suggestionString = suggestion;
        this.setSuggestionUrl(suggestion);
      }
    }
  }

  /**
   * Helper function to set the actual url that the page link will link to
   *
   * @param suggestion
   *     The suggestion word
   */
  setSuggestionUrl(suggestion: string): void {
    if (!suggestion) {
      this.suggestionStringUrl = `/${this.eventId}/executive`;
    } else {
      this.suggestionStringUrl = `/${this.eventId}/${suggestion}`;
    }
  }

  /**
   * Splits the location and gets the last endpoint after the eventId param in
   *    the url and sets the urlMatch property
   */
  splitUrl(): void {
    // Get misspelled/mistyped endpoint from url
    const urlSplit = location.href.split('/');
    this.urlMatch = urlSplit[urlSplit.length - 1];
  }
}
