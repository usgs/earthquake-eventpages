import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import {
  ActivatedRoute,
  ParamMap,
  Router,
  NavigationEnd
} from '@angular/router';

import { Subscription } from 'rxjs';

import { ContributorService } from '@core/contributor.service';
import { EventService } from '@core/event.service';

import { EventDepthPipe } from '../event-depth.pipe';
import { DateTimePipe } from '@shared/date-time.pipe';
import { LocationPipe } from '@shared/location.pipe';

/**
 * Main event page component, wraps inbound data components
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EventDepthPipe, DateTimePipe, LocationPipe],
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
    public meta: Meta,
    public router: Router,
    public locationPipe: LocationPipe,
    public eventDepthPipe: EventDepthPipe,
    public dateTimePipe: DateTimePipe
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

    this.subscription.add(
      this.eventService.event$.subscribe(event => {
        if (!event) {
          return;
        }
        // Title - facebook meta tag
        if (event.properties.title) {
          this.meta.updateTag({
            content: event.properties.title,
            property: 'og:title'
          });
        }
        // Description - facebook meta tag
        this.meta.updateTag({
          content: this.updateDescriptionMetaTag(event),
          property: 'og:description'
        });
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

  /**
   * Get concatenated string for event description
   *
   * @param event Event
   */
  updateDescriptionMetaTag(event) {
    try {
      const time = this.dateTimePipe.transform(event.properties.time);
      const location = this.locationPipe.transform(event.geometry.coordinates);
      const depth = this.eventDepthPipe.transform(event);

      return time + ' | ' + location + ' | ' + depth;
    } catch (e) {
      return 'Earthquake event page.';
    }
  }
}
