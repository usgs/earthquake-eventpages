import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WildcardComponent } from './wildcard/wildcard.component';


const wildcardRoutes = [
  {
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: '',
    component: WildcardComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(wildcardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WildcardRoutingModule { }
