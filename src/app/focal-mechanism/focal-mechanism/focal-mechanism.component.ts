import { Component, OnInit } from '@angular/core';

import { Tensor } from '../../shared/beachball/tensor';
import { EventService } from '../../core/event.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'focal-mechanism',
  templateUrl: './focal-mechanism.component.html',
  styleUrls: ['./focal-mechanism.component.scss']
})
export class FocalMechanismComponent implements OnInit {

  public tensor: Tensor = null;

  private eventSubscription: Subscription;

  constructor(
    public eventService: EventService
  ) { }

  ngOnInit () {
    this.eventSubscription = this.eventService.product$.subscribe((product) => {
      this.tensor = Tensor.fromProduct(product);
    });
  }

  ngOnDestroy () {
    this.eventSubscription.unsubscribe();
  }

}
