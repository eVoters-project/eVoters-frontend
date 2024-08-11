import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotersRoutingModule } from './voters-routing.module';
import { IndexComponent } from './index/index.component';

import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { CardModule } from 'primeng/card';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { CalendarModule } from 'primeng/calendar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TagModule } from 'primeng/tag';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VoterFindCoordinatesComponent } from './voter-find-coordinates/voter-find-coordinates.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { VoterEntryComponent } from './voter-entry/voter-entry.component';
import { VoterService } from './service/voter.service';
import { VoterApiService } from '../../service/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';

@NgModule({
  declarations: [
    IndexComponent,
    VoterFindCoordinatesComponent,
    VoterEntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VotersRoutingModule,
    GoogleMapsModule,
    CardModule,
    ContextMenuModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    MenuModule,
    ToastModule,
    ScrollPanelModule,
    SidebarModule,
    TagModule,
    ToggleButtonModule
  ],
  providers: [
    VoterService,
    VoterApiService,
    DialogService,
    ConfirmationService,
    MessageService
  ]
})
export class VotersModule { }
