import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoteCountRoutingModule } from './vote-count-routing.module';
import { IndexComponent } from './index/index.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PerRankComponent } from './per-rank/per-rank.component';
import { PerPositionComponent } from './per-position/per-position.component';
import { PerLocationComponent } from './per-location/per-location.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    IndexComponent,
    PerRankComponent,
    PerPositionComponent,
    PerLocationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VoteCountRoutingModule,
    TabMenuModule,
    RadioButtonModule,
    DropdownModule,
    TableModule,
    ButtonModule
  ]
})
export class VoteCountModule { }
