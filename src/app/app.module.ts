import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { EventPageModule } from './event-page/event-page.module';

import { UnknownEventPageComponent } from './unknown-event-page/unknown-event-page.component';
import { EventService } from './event.service';

import { ExecutiveModule } from './executive/executive.module';
import { RegionInfoModule } from './region-info/region-info.module';

@NgModule({
  declarations: [
    AppComponent,
    UnknownEventPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    EventPageModule,
    ExecutiveModule,
    RegionInfoModule,

    AppRoutingModule
  ],
  providers: [
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
