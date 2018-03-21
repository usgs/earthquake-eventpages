import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../core/event.service';
import { MetadataService } from '../../core/metadata.service';

@Component({
  selector: 'shakemap-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css']
})
export class MetadataComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  public metadata: any = null;

  constructor(public mdService: MetadataService,
              public eventService: EventService) { }

  ngOnInit () {
    this.subs.add(this.mdService.metadata$.subscribe((metadata) => {
      this.onMetadata(metadata);
    }));
    this.subs.add(this.eventService.product$.subscribe((product) => {
      this.onProduct(product);
    }));
  }

  /**
   * New product, get new station list
   *
   * @param product shakemap product
   */
  onProduct (product) {
    this.mdService.getMetadata(product);
  }

  /**
   * New stations
   *
   * @param stations station list json
   */
  onMetadata (metadata) {
    this.metadata = metadata;
  }

  /**
   * Unsubscribe from all existing subs when
   * the component is destroyed
   */
  ngOnDestroy () {
    this.subs.unsubscribe();
  }

}
