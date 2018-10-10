import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '@core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EventPageModule } from './event-page/event-page.module';
import { ExecutiveModule } from './executive/executive.module';
import { MapModule } from './map/map.module';
import { RegionInfoModule } from './region-info/region-info.module';
import { UnknownEventPageModule } from './unknown-event-page/unknown-event-page.module';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    CoreModule.forRoot(),
    EventPageModule,
    UnknownEventPageModule,

    ExecutiveModule,
    MapModule,
    RegionInfoModule,

    AppRoutingModule
  ],
  providers: [Title]
})
export class AppModule {}
