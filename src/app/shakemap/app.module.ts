import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { HttpInterceptor_ } from './http-interceptor';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { LayerService } from './map/layers/layer.service';
import { EventsComponent } from './events/events.component';
import { EventService } from './events/event.service';
import { MapService } from './map/map.service';
import { ConfService } from './conf.service';
import { BottomPanelComponent } from './bottom-panel/bottom-panel.component';
import { InfoComponent } from './bottom-panel/info/info.component';
import { InfoService } from './bottom-panel/info/info.service';
import { StationListComponent } from './bottom-panel/station-list/station-list.component';
import { StationService } from './bottom-panel/station-list/station.service';
import { MapControlComponent } from './map/map-control/map-control.component';
import { MapControlService } from './map/map-control/map-control.service';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    EventsComponent,
    BottomPanelComponent,
    InfoComponent,
    StationListComponent,
    MapControlComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [LayerService,
                EventService,
                MapService,
                ConfService,
                InfoService,
                StationService,
                MapControlService/*,
                { 
                    provide: HTTP_INTERCEPTORS, 
                    useClass: HttpInterceptor_, 
                    multi: true
                }*/],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
