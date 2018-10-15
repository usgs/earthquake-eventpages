import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { HazdevTemplateModule } from 'hazdev-ng-template';

import { ContributorListPipe } from './contributor-list.pipe';
import { CooperatorPipe } from './cooperator.pipe';
import { EventDateTimePipe } from './event-date-time.pipe';
import { EventDepthPipe } from './event-depth.pipe';
import { EventLocationPipe } from './event-location.pipe';
import { EventPageComponent } from './event-page/event-page.component';
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
    CooperatorPipe,
    EventDateTimePipe,
    EventDepthPipe,
    EventLocationPipe,
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
