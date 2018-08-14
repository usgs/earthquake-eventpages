import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { HazdevTemplateModule } from 'hazdev-template';

import { SharedModule } from '@shared/shared.module';
import { ContributorListPipe } from './contributor-list.pipe';
import { EventDateTimePipe } from './event-date-time.pipe';
import { EventDepthPipe } from './event-depth.pipe';
import { EventLocationPipe } from './event-location.pipe';
import { EventPageComponent } from './event-page/event-page.component';
import { EventTitlePipe } from './event-title.pipe';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    // Components
    EventPageComponent,
    FooterComponent,
    HeaderComponent,

    // Pipes
    EventDateTimePipe,
    EventDepthPipe,
    EventLocationPipe,
    EventTitlePipe,
    ContributorListPipe,
    NavigationComponent
  ],
  exports: [ContributorListPipe, EventPageComponent, FooterComponent],
  imports: [
    CommonModule,
    MatListModule,
    RouterModule,

    HazdevTemplateModule,
    SharedModule
  ]
})
export class EventPageModule {}
