import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartyRoutingModule } from './party-routing.module';
import { IndexComponent } from './index/index.component';
import { PartyEntryComponent } from './party-entry/party-entry.component';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { PartyApiService } from '../../service/api';
import { PartyService } from './party.service';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PerformApiService } from '../../service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';


@NgModule({
  declarations: [
    IndexComponent,
    PartyEntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PartyRoutingModule,

    ButtonModule,
    ConfirmDialogModule,
    ContextMenuModule,
    DropdownModule,
    DynamicDialogModule,
    InputTextModule,
    ScrollPanelModule,
    TableModule,
    TagModule,
    ToastModule,
    InputTextareaModule,
    TabViewModule,
    BadgeModule
  ],
  providers: [
    ConfirmationService,
    DialogService,
    PartyApiService,
    PartyService,
    PerformApiService,
    MessageService
  ]
})
export class PartyModule { }
