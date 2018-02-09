import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import { ProductPageComponent } from '../../product-page/product-page/product-page.component';
import { ProductService } from '../../product.service';


@Component({
  selector: 'origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.css']
})
export class OriginComponent {

  constructor(
    public productService: ProductService
  ) { }


  showProduct(product: any) {
    return JSON.stringify(product, null, 2);
  }

}
