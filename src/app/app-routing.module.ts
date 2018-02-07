import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventPageComponent } from './event-page/event-page.component';
import { UnknownEventPageComponent } from './unknown-event-page/unknown-event-page.component';


const appRoutes = [
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
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
