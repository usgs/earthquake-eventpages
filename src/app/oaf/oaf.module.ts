import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OafComponent } from './oaf/oaf.component';
import { CommentaryComponent } from './commentary/commentary.component';
import { ForecastComponent } from './forecast/forecast.component';
import { ModelComponent } from './model/model.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OafComponent, CommentaryComponent, ForecastComponent, ModelComponent]
})
export class OafModule { }
