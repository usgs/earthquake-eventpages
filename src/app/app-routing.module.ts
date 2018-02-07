import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventPageComponent } from './event-page/event-page/event-page.component';
import { UnknownEventPageComponent } from './event-page/unknown-event-page/unknown-event-page.component';


const appRoutes: Routes = [
  {
    path: 'unknown',
    component: UnknownEventPageComponent
  },
  {
    path: ':eventid',
    component: EventPageComponent
  },
  {
    path: '',
    redirectTo: '/unknown',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  declarations: []
})
export class AppRoutingModule { }
