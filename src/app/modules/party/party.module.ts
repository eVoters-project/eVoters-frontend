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


@NgModule({
  declarations: [
    IndexComponent,
    PartyEntryComponent
  ],
  imports: [
    CommonModule,
    PartyRoutingModule,

    ButtonModule,
    DropdownModule,
    DynamicDialogModule,
    InputTextModule,
    ScrollPanelModule,
    TableModule,
    TagModule,
    InputTextareaModule
  ],
  providers: [
    PartyApiService,
    PartyService,
    DialogService,
  ]
})
export class PartyModule { }
