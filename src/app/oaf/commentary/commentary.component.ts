import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { EventService } from '../../core/event.service';
import { OafService } from '../oaf.service';


@Component({
  selector: 'oaf-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.scss']
})
export class CommentaryComponent implements OnDestroy, OnInit {

  public forecast;
  public subscription: Subscription;

  constructor (
    public eventService: EventService,
    public oafService: OafService
  ) { }

  ngOnInit () {
    this.subscription = this.oafService.oaf$.subscribe((oaf) => {
      // select the forecast specified by `oaf.advisoryTimeFrame`
      this.forecast = this.transformForecast(oaf);
      console.log(oaf);
    });
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  transformObservations (magnitude, bins) {
    let bin;

    for (let i = 0, len = bins.length; i < len; i++) {
      bin = bins[i];
      if (bin.magnitude === magnitude) {
        return bin.count;
      }
    }

    return 0;
  }

  transformForecast (oaf) {
    let bin,
        bins,
        forecasts,
        forecast,
        magnitudeBins,
        timeframe;

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
}
