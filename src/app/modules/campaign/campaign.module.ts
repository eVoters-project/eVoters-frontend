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
import { CampaignApiService, VoterApiService } from '../../service/api';
import { CampaignService } from './campaign.service';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { CampaignEventComponent } from './campaign-event/campaign-event.component';
import { CampaignSmsComponent } from './campaign-sms/campaign-sms.component';
import { PickListModule } from 'primeng/picklist';
import { DragDropModule } from 'primeng/dragdrop';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { VoterService } from '../voters/service/voter.service';
import { PerformApiService } from '../../service';


@NgModule({
  declarations: [
    IndexComponent,
    CampaignEntryComponent,
    CampaignEventComponent,
    CampaignSmsComponent
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
    DividerModule,
    DragDropModule,
    DropdownModule,
    FieldsetModule,
    ScrollPanelModule,
    TableModule,
    TagModule,
    InputTextModule,
    InputTextareaModule,
    PanelModule,
    PickListModule,
    TabMenuModule,
    InputTextareaModule,
    ToastModule
  ],
  providers: [
    CampaignApiService,
    CampaignService,
    ConfirmationService,
    DialogService,
    MessageService,
    PerformApiService,
    VoterService,
    VoterApiService
  ]
})
export class CampaignModule { }
