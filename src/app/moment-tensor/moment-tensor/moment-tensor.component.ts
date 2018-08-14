import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { EventService } from '@core/event.service';
import { Tensor } from '@shared/beachball/tensor';

/**
 * Scaffold for Moment Tensor product page
 */
@Component({
  selector: 'app-moment-tensor',
  templateUrl: './moment-tensor.component.html',
  styleUrls: ['./moment-tensor.component.scss']
})
export class MomentTensorComponent implements OnInit, OnDestroy {
  tensor: Tensor = null;
  subscription: Subscription = new Subscription();

  constructor(public eventService: EventService) {}

  ngOnInit() {
    this.subscription.add(
      this.eventService.product$.subscribe(product => {
        this.tensor = Tensor.fromProduct(product);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
