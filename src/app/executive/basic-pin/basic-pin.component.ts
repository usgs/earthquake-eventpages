import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContributorService } from '../../contributor.service';
import { Event } from '../../event';
import { EventService } from '../../event.service';

@Component({
  selector: 'basic-pin',
  templateUrl: './basic-pin.component.html',
  styleUrls: ['./basic-pin.component.css']
})
export class BasicPinComponent implements OnDestroy, OnInit {
  @Input() action; // router link for action button
  @Input() link; // router link for entire card action
  @Input() subtitle; // text for subtitle
  @Input() title; // text for title
  @Input() type; // type of product

  public contributors;
  public contributorSubscription;
  public event;
  public eventSubscription;
  public product;

  constructor (
    public eventService: EventService,
    public contributorService: ContributorService
  ) { }

  ngOnInit () {
    this.contributorSubscription = this.contributorService.contributors$.subscribe((contributors) => {
      this.contributors = contributors;
    });
    this.eventSubscription = this.eventService.event$.subscribe((event) => {
      this.event = event;
      this.product = event.getProduct(this.type);
    });
  }

  ngOnDestroy () {
    this.contributorSubscription.unsubscribe();
    this.eventSubscription.unsubscribe();
  }
}
