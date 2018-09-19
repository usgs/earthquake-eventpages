import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  ParamMap,
  Router,
  NavigationEnd
} from '@angular/router';

import { Subscription } from 'rxjs';

import { ContributorService } from '@core/contributor.service';
import { EventService } from '@core/event.service';

/**
 * Main event page component, wraps inbound data components
 */
@Component({
  selector: 'app-event-page',
  styleUrls: ['./event-page.component.scss'],
  templateUrl: './event-page.component.html'
})
export class EventPageComponent implements OnInit, OnDestroy {
  child: any = null;
  subscription = new Subscription();

  constructor(
    public route: ActivatedRoute,
    public contributorService: ContributorService,
    public eventService: EventService,
    public router: Router
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription.add(
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        return this.onParamMapChange(paramMap);
      })
    );

    try {
      this.subscription.add(
        this.router.events.subscribe(e => {
          if (e instanceof NavigationEnd) {
            // if the EventPageComponent's child route ("module") has changed
            if (this.child !== this.route.firstChild) {
              this.child = this.route.firstChild;
              // scroll back to the top of the page
              window.scrollTo(0, 0);
            }
          }
        })
      );
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * When the query params change, get the new event id
   *
   * @param paramMap
   *     The url query parameters
   */
  onParamMapChange(paramMap: ParamMap): void {
    // request event
    this.eventService.getEvent(paramMap.get('eventid'));
  }

  /**
   * Checks for changes to data by index
   *
   * @param index
   *    index of array
   * @param item
   *    general text product
   */
  trackByIndex(index, item) {
    return index;
  }
}
