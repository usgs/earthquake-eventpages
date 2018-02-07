import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { EventPageComponent } from './event-page/event-page.component';
import { AppRoutingModule } from './app-routing.module';
import { UnknownEventPageComponent } from './unknown-event-page/unknown-event-page.component';


@NgModule({
  declarations: [
    AppComponent,
    EventPageComponent,
    UnknownEventPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
