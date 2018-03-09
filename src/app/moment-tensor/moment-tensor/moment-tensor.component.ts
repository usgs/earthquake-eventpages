import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tensor } from '../../shared/beachball/tensor';
import { EventService } from '../../core/event.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-moment-tensor',
  templateUrl: './moment-tensor.component.html',
  styleUrls: ['./moment-tensor.component.css']
})
export class MomentTensorComponent implements OnInit, OnDestroy {

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
