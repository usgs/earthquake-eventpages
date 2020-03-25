import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { EventService } from '@core/event.service';
import { ProductContentPipe } from '@shared/product-content.pipe';

/**
 * Intensity map showed when user selects the intensity tab from main shakemap
 */
@Component({
  selector: 'shakemap-intensity',
  styleUrls: [
    './intensity.component.scss',
    '../shakemap/shakemap.component.scss'
  ],
  templateUrl: './intensity.component.html'
})
export class IntensityComponent implements OnInit, OnDestroy {
  contourOverlays = ['shakemap-mmi-contours','shakemap-stations'];
  coverageOverlays = ['shakemap-mmi-coverage','shakemap-stations'];
  formats = ['png', 'jpg', 'pdf'];
  imageOverlays = ['shakemap-intensity','shakemap-stations'];
  overlays;
  subs = new Subscription();

  constructor(public eventService: EventService) {
  }

  ngOnDestroy () {
    this.subs.unsubscribe();
  }

  ngOnInit () {
    this.subs.add(this.eventService.product$.subscribe((shakemap) => {
      this.setDefaultOverlays(shakemap);
    }));
  }

  /**
   * Determines whether the default map layers should be coverage from
   * updated shakemap versions or the image overlays which are used by
   * older shakemap versions
   *
   * @param shakemap
   *     shakemap product
   */
  setDefaultOverlays (shakemap) {
    const pipe = new ProductContentPipe();
    if (pipe.transform(shakemap, 'download/coverage_mmi_high_res.covjson')) {
      this.overlays = this.coverageOverlays;
    } else {
      this.overlays = this.imageOverlays;
    }
  }
}
