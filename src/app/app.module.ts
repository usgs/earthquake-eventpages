import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { EventPageModule } from './event-page/event-page.module';
import { UnknownEventPageModule } from './unknown-event-page/unknown-event-page.module';

import { ExecutiveModule } from './executive/executive.module';
import { OriginModule } from './origin/origin.module';
import { RegionInfoModule } from './region-info/region-info.module';

import { ContributorService } from './contributor.service';
import { EventService } from './event.service';
import { FormatterService } from './formatter.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    EventPageModule,
    UnknownEventPageModule,

    ExecutiveModule,
    OriginModule,
    RegionInfoModule,

    AppRoutingModule
  ],
  providers: [
    ContributorService,
    EventService,
    FormatterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
