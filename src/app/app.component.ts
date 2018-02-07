import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { EventService } from './event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';

  private routerSubscription: Subscription;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public eventService: EventService
  ) { }

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe(
        (event : RouterEvent) => this.onRouterEvent(event));
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  onRouterEvent(event: RouterEvent) {
    if (!(event instanceof NavigationEnd)) {
      return;
    }
    console.log(this.route.params);
  }

}
