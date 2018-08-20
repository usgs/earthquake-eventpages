import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { EventService } from '@core/event.service';
import { Tensor } from '@shared/beachball/tensor';

/**
 * Scaffold for Moment Tensor product page
 */
@Component({
  selector: 'app-moment-tensor',
  styleUrls: ['./moment-tensor.component.scss'],
  templateUrl: './moment-tensor.component.html'
})
export class MomentTensorComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  tensor: Tensor = null;

  constructor(public eventService: EventService) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription.add(
      this.eventService.product$.subscribe(product => {
        this.tensor = Tensor.fromProduct(product);
      })
    );
  }
}
