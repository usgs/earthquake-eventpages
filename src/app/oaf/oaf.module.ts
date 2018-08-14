import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';

import { MdcTabModule, MdcIconModule } from '@angular-mdc/web';

import { ProductPageModule } from '../product-page/product-page.module';
import { SharedModule } from '@shared/shared.module';
import { CommentaryDetailsComponent } from './commentary-details/commentary-details.component';
import { CommentaryComponent } from './commentary/commentary.component';
import { ForecastComponent } from './forecast/forecast.component';
import { ModelComponent } from './model/model.component';
import { OafPercentPipe } from './oaf-percent.pipe';
import { OafRoutingModule } from './oaf-routing.module';
import { OafService } from './oaf.service';
import { OafComponent } from './oaf/oaf.component';
import { UpdateTimePipe } from './update-time.pipe';

@NgModule({
  declarations: [
    CommentaryComponent,
    ForecastComponent,
    ModelComponent,
    OafComponent,
    OafPercentPipe,
    UpdateTimePipe,
    CommentaryDetailsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatTabsModule,
    MdcIconModule,
    MdcTabModule,
    ProductPageModule,
    SharedModule,

    OafRoutingModule
  ],
  providers: [OafService]
})
export class OafModule {}
