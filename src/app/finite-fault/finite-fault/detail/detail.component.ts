import { Component, Input } from '@angular/core';
import { ProductPropertyPipe } from '@shared/product-property.pipe';
import { CreateSegmentsPipe } from 'app/finite-fault/create-segments.pipe';

import { Event } from '../../../event';
import { Segment } from '../../segment';


/**
 * Display finite-fault product information
 */
@Component({
  selector: 'finite-fault-detail',
  styleUrls: ['./detail.component.scss'],
  templateUrl: './detail.component.html'
})
export class FiniteFaultDetailComponent {

  // crustal model, todo: read from property
  crustalModel = "1D crustal model interpolated from CRUST2.0 (Bassin et al., 2000)";

  // store product for getter/setter below
  @Input()
  product: any = null;

  // All finite fault products.
  @Input()
  products: any[] = [];

  constructor() { }

}
