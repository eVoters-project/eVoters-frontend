import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StrawVoteRoutingModule } from './straw-vote-routing.module';
import { IndexComponent } from './index/index.component';
import { StrawVoteEntryComponent } from './straw-vote-entry/straw-vote-entry.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IndexComponent,
    StrawVoteEntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StrawVoteRoutingModule,
    TabMenuModule,
    DropdownModule
  ]
})
export class StrawVoteModule { }
