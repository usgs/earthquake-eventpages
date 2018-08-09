import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { EventService } from '../../core/event.service';
import { MetadataService } from '../../core/metadata.service';


/**
 * Metadata subcomponent, shows input/output/processing data when the user
 * selects the 'metadata' tab from main shakemap component
 */
@Component({
  selector: 'shakemap-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnInit, OnDestroy {


  public subs = new Subscription();
  public metadata: any = null;


  constructor (
      public mdService: MetadataService,
      public eventService: EventService) { }


  ngOnInit () {
    this.subs.add(this.mdService.metadata$.subscribe((metadata) => {
      this.onMetadata(metadata);
    }));
    this.subs.add(this.eventService.product$.subscribe((product) => {
      this.onProduct(product);
    }));
  }

  ngOnDestroy () {
    this.subs.unsubscribe();
  }

  /**
   * New product, get new station list
   *
   * @param product
   *     shakemap product
   */
  onProduct (product): void {
    this.mdService.getMetadata(product);
  }

  /**
   * New stations
   *
   * @param stations
   *     station list json
   */
  onMetadata (metadata): void {
    this.metadata = metadata;
  }

}
