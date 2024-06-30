import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotersRoutingModule } from './voters-routing.module';
import { IndexComponent } from './index/index.component';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    VotersRoutingModule,

    CardModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    SidebarModule
  ]
})
export class VotersModule { }
