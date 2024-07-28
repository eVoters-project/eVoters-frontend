import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignRoutingModule } from './campaign-routing.module';
import { IndexComponent } from './index/index.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CampaignEntryComponent } from './campaign-entry/campaign-entry.component';
import { DropdownModule } from 'primeng/dropdown';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DialogService } from 'primeng/dynamicdialog';
import { CampaignApiService } from '../../service/api';
import { CampaignService } from './campaign.service';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    IndexComponent,
    CampaignEntryComponent

  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,

    ButtonModule,
    CalendarModule,
    CardModule,
    DropdownModule,
    ScrollPanelModule,
    TableModule,
    TagModule,
    InputTextModule,
    InputTextareaModule
  ],
  providers: [
    CampaignApiService,
    CampaignService,
    DialogService
  ]
})
export class CampaignModule { }
