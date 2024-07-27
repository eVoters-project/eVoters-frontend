import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaderRoutingModule } from './leader-routing.module';
import { IndexComponent } from './index/index.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { LeaderEntryComponent } from './leader-entry/leader-entry.component';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaderService } from './leader.service';


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
    DropdownModule,
    ScrollPanelModule,
    TableModule,
    TagModule
  ],
  providers: [
    LeaderService,
    DialogService
  ]
})
export class LeaderModule { }
