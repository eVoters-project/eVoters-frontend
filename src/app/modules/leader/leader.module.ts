import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaderRoutingModule } from './leader-routing.module';
import { IndexComponent } from './index/index.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { LeaderEntryComponent } from './leader-entry/leader-entry.component';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaderService } from './leader.service';
import { LeaderApiService } from '../../service/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';


@NgModule({
  declarations: [
    IndexComponent,
    LeaderEntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LeaderRoutingModule,
    DynamicDialogModule,

    ButtonModule,
    ConfirmDialogModule,
    ContextMenuModule,
    DropdownModule,
    ScrollPanelModule,
    TableModule,
    TagModule,
    ToastModule,
  ],
  providers: [
    LeaderApiService,
    LeaderService,
    DialogService,
    MessageService,
    ConfirmationService
  ]
})
export class LeaderModule { }
