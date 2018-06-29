import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { DyfiService } from '../dyfi.service';
import { EventService } from '../../core/event.service';

@Component({
  selector: 'dyfi-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss']
})
export class ResponsesComponent implements OnInit {
  private subs = new Subscription;
  public responses = new MatTableDataSource(null);
  public loaded = false;
  public headers = [
    'name',
    'cdi',
    'nresp',
    'dist',
    'lat',
    'lon'
  ]
  constructor (
    public dyfiService: DyfiService,
    public eventService: EventService
  ) { }


  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.subs.add(this.dyfiService.cdiZip$.subscribe((data) => {
      this.onDyfiSeries(data);
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
    if (product === null) {

      this.responses = null;
      this.loaded = false
      return;
    }

    this.dyfiService.getCdi(product);
  }

  onDyfiSeries (dyfiData) {
    this.responses = new MatTableDataSource(dyfiData);
    this.responses.sort = this.sort;
    this.loaded = true;
  }

  ngOnDestroy () {
    this.subs.unsubscribe();
  }


}
