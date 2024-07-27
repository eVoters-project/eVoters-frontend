import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartyRoutingModule } from './party-routing.module';
import { IndexComponent } from './index/index.component';
import { PartyEntryComponent } from './party-entry/party-entry.component';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';


@NgModule({
  declarations: [
    IndexComponent,
    PartyEntryComponent
  ],
  imports: [
    CommonModule,
    PartyRoutingModule,

    ButtonModule,
    DynamicDialogModule,
    TableModule,
    TagModule
  ],
  providers: [
    DialogService
  ]
})
export class PartyModule { }
