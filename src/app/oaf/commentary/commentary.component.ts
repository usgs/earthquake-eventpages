import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { EventService } from '@core/event.service';
import { OafService } from '../oaf.service';

/**
 * Display commentary information in tab on OAF product page
 */
@Component({
  selector: 'oaf-commentary',
  styleUrls: ['./commentary.component.scss'],
  templateUrl: './commentary.component.html'
})
export class CommentaryComponent implements OnDestroy, OnInit {
  forecast;
  subscription: Subscription;

  constructor(
    public eventService: EventService,
    public oafService: OafService
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.oafService.oaf$.subscribe(oaf => {
      // select the forecast specified by `oaf.advisoryTimeFrame`
      this.forecast = this.transformForecast(oaf);
    });
  }

  /**
   * Takes the OAF product finds the forecast for the correct timeframe
   *
   * @param oaf
   *     oaf product with forecasts and timeframe
   *
   * @return
   *     aftershock forecast based on oaf.advisoryTimeFrame
   */
  transformForecast(oaf: any) {
    let bin, bins, forecasts, forecast, magnitudeBins, timeframe;

    if (!oaf) {
      return;
    }

    forecasts = oaf.forecast;
    timeframe = oaf.advisoryTimeFrame;

    for (let i = 0, len = forecasts.length; i < len; i++) {
      forecast = forecasts[i];
      if (forecast.label === timeframe) {
        forecast = JSON.parse(JSON.stringify(forecast));
        break;
      }
    }

    bins = forecast.bins;
    magnitudeBins = {};

    for (let i = 0, len = bins.length; i < len; i++) {
      bin = bins[i];
      magnitudeBins['magnitude-' + bin.magnitude] = bin;
    }

    forecast.bins = magnitudeBins;

    return forecast;
  }

  /**
   * Counts the number of aftershocks within a certain magnitude threshold
   *
   * @param magnitude
   *     The magnitude to compare
   *
   * @param bins
   *     Array of aftershocks binned by magnitude
   *
   * @return
   *     The number of earthquakes within the magnitude threshold
   */
  transformObservations(magnitude: number, bins: Array<any>) {
    let bin;

    for (let i = 0, len = bins.length; i < len; i++) {
      bin = bins[i];
      if (bin.magnitude === magnitude) {
        return bin.count;
      }
    }

    return 0;
  }
}
