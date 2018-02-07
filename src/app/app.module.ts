import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { EventPageModule } from './event-page/event-page.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EventPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
