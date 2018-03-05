declare function require(string): string;

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapControlService } from './map-control.service';
import { MapService } from '../map.service';
import { Observable } from 'rxjs/observable';
import { ConfService } from '../../conf.service';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import 'rxjs/add/operator/take';

import * as L from 'leaflet';

@Component({
  selector: 'shakemap-view-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.scss']
})
export class MapControlComponent implements OnInit, OnDestroy {
  public subs: any[] = [];
  public controlCollapsed: boolean = true;
  public legendCollapsed: boolean = true;
  public allowLegend: boolean = false;
  public control: any[] = [];
  public plotting: string[] = [];
  public legend: any = {};
  public onMap: any = {};
  public objKeys: any = Object.keys;
  public layersImg: any = require('leaflet/dist/images/layers.png');
  private initLoading: boolean = true; // True after first map layers render
  private timeoutTimer: any = null;

  constructor(public controlService: MapControlService,
              private mapService: MapService,
              private confService: ConfService) { }

  ngOnInit() {
    this.subs.push(this.controlService.addOverlay_.subscribe((overlay:any) => {
      this.newOverlay(overlay);
    }));

    this.subs.push(this.controlService.clear_.subscribe((overlay:any) => {
      // remember which layers are plotted
      this.clearAll();
    }));

    this.timeoutTimer = TimerObservable.create(5000, 1000).subscribe((time: any)=> {
      this.initLoading = false;
      this.timeoutTimer.unsubscribe();
    });
  }

  toggleLayer(overlay) {
    if (!this.onMap[overlay.id]) {
      this.addLayer(overlay);
    } else {
      this.removeLayer(overlay);
    }
  }

  newOverlay(overlay) {
    this.control.push(overlay);

    if (((this.confService.conf['defaultLayers'].includes(overlay.id)) 
              && (this.plotting.length === 0) || 
              ((this.confService.conf['defaultLayers'].includes(overlay.id)) 
              && this.initLoading)) || 
              (this.plotting.indexOf(overlay.id) > -1)) {
        
      // add the layer to the map
      this.addLayer(overlay);

      // align map
      let layers = []
      for (let layer in this.onMap) {
        layers.push(this.onMap[layer].layer)
      }
      let group = L.featureGroup(layers);
      this.mapService.setBounds.next(group.getBounds().pad(0.1));
    }
  }

  addLayer(overlay) {
    // if legend images exists, add them
    if (overlay['legendImages']) {
      for (let url of overlay['legendImages']) {
        if (!this.legend[url]) {
          this.legend[url] = {'count': 1,
                                'url': url};
        } else {
          this.legend[url].count += 1;
        }
      }
    }

    this.onMap[overlay.id] = overlay;
    overlay['onMap'] = true;
    this.plotting.push(overlay.id);

    // add to map
    this.mapService.map.addLayer(overlay.layer)

    // check if the legend is available
    this.checkAllowLegend();
  }

  removeLayer(overlay) {
    if (this.onMap[overlay.id]) {
      delete this.onMap[overlay.id]
      overlay.onMap = false;

      if (overlay['legendImages']) {
        for (let url of overlay['legendImages']) {
          this.legend[url].count -= 1;
        }
      }
    }

    // remove from map
    this.mapService.map.removeLayer(overlay.layer)

    // stop tracking this layer
    this.plotting = this.plotting.filter(l => l !== overlay.id)

    // check if the legend should be open
    this.checkAllowLegend();
  }

  clearAll() {
    for (let overlay in this.onMap) {
      this.mapService.map.removeLayer(this.onMap[overlay].layer)
    }

    this.control = []
    this.legend = []
    this.onMap = {}
  }

  checkAllowLegend() {
    for (let item in this.legend) {
      if (this.legend[item].count > 0) {
        this.allowLegend = true;
        return true;
      }
    }

    // no legends in use
    this.legendCollapsed = true;
    this.allowLegend = false;
    return false;
  }

  toggleLegend() {
    let allow = this.checkAllowLegend();
    if (!this.legendCollapsed) {
      this.legendCollapsed = true;
    } else if (allow) {
      this.legendCollapsed = false;
    }
  }

  ngOnDestroy() {
    for (let sub of this.subs) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }

}
