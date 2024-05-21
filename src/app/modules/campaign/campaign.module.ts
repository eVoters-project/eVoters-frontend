import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignRoutingModule } from './campaign-routing.module';
import { IndexComponent } from './index/index.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,

    CardModule,
    TableModule
  ]
})
export class CampaignModule { }
