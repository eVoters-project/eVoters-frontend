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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    IndexComponent,
    CampaignEntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CampaignRoutingModule,

    ButtonModule,
    CalendarModule,
    CardModule,
    ConfirmDialogModule,
    ContextMenuModule,
    DropdownModule,
    ScrollPanelModule,
    TableModule,
    TagModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule
  ],
  providers: [
    CampaignApiService,
    CampaignService,
    ConfirmationService,
    DialogService,
    MessageService
  ]
})
export class CampaignModule { }
