import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { EventService } from '@core/event.service';
import { MetadataService } from '@core/metadata.service';

/**
 * Metadata subcomponent, shows input/output/processing data when the user
 * selects the 'metadata' tab from main shakemap component
 */
@Component({
  selector: 'shakemap-metadata',
  styleUrls: ['./metadata.component.scss'],
  templateUrl: './metadata.component.html'
})
export class MetadataComponent implements OnInit, OnDestroy {
  metadata: any = null;
  subs = new Subscription();

  constructor(
    public mdService: MetadataService,
    public eventService: EventService
  ) {}

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    this.subs.add(
      this.mdService.metadata$.subscribe(metadata => {
        this.onMetadata(metadata);
      })
    );
    this.subs.add(
      this.eventService.product$.subscribe(product => {
        this.onProduct(product);
      })
    );
  }

  /**
   * Set metadata property
   *
   * @param metadata
   *     shakemap metadata
   */
  onMetadata(metadata): void {
    this.metadata = metadata;
  }

  /**
   * New product, get new station list
   *
   * @param product
   *     shakemap product
   */
  onProduct(product): void {
    this.mdService.getMetadata(product);
  }
}
