import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/subscription';

import { mmiLayer } from './cont_mmi';
import { miLayer } from './cont_mi';
import { pgaLayer } from './cont_pga';
import { pgvLayer } from './cont_pgv';
import { epicenterLayer } from './epicenter';
import { stationLayer } from './stations';

var layers = [epicenterLayer, mmiLayer, miLayer, pgaLayer, pgvLayer, stationLayer];

@Injectable()
export class LayerService {
  public nextLayer = new ReplaySubject(1);
  public data: any = {};
  public waiting: any[] = [];

  constructor(private http: HttpClient) {}

  genLayers(event) {
    // stop waiting on old map layers
    this.stopWaiting();

    let contents = event['shakemap'][0]['contents'];
    for (let layer of layers) {
      // check if this layers product is available
      if (layer['productId'] in contents) {
        // get the product
        this.waiting.push(
          this.http.get(contents[layer['productId']]['url'], 
                          {responseType: layer['productType']})
            .subscribe(product => {
              // generate the layer
              layer['layer'] = layer.generateLayer(product);

              // let the map know it's ready
              this.nextLayer.next(layer);

              // record data for later usage
              this.data[layer['id']] = product;
            })
          );
      }
    }
  }

  stopWaiting() {
    // Stop existing request for layers
    for (let sub of this.waiting) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }

}
