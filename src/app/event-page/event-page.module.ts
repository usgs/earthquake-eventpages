import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { EventPageComponent } from './event-page/event-page.component';
import { EventHeaderComponent } from './event-header/event-header.component';

// Pipes
import { EventDateTimePipe } from './event-date-time.pipe';
import { EventDepthPipe } from './event-depth.pipe';
import { EventLocationPipe } from './event-location.pipe';
import { EventTitlePipe } from './event-title.pipe';
import { FooterComponent } from './footer/footer.component';
import { ContributorListPipe } from './contributor-list.pipe';


@NgModule({
  imports: [
    CommonModule,

    RouterModule
  ],
  declarations: [
    // Components
    EventPageComponent,
    EventHeaderComponent,
    FooterComponent,

    // Pipes
    EventDateTimePipe,
    EventDepthPipe,
    EventLocationPipe,
    EventTitlePipe,
    ContributorListPipe
  ],
  exports: [
    EventPageComponent
  ],
})
export class EventPageModule { }
