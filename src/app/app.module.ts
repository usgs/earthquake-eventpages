import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { EventPageComponent } from './event-page/event-page.component';
import { UnknownEventPageComponent } from './unknown-event-page/unknown-event-page.component';
import { EventService } from './event.service';

@NgModule({
  declarations: [
    AppComponent,
    EventPageComponent,
    UnknownEventPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
