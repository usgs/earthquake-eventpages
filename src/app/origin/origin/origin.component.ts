import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import { ProductPageComponent } from '../../product-page/product-page/product-page.component';
import { EventService } from '../../event.service';


@Component({
  selector: 'origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.css']
})
export class OriginComponent {

  constructor(
    public eventService: EventService
  ) { }


  showProduct(product: any) {
    return JSON.stringify(product, null, 2);
  }

}
