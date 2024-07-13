import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotersRoutingModule } from './voters-routing.module';
import { IndexComponent } from './index/index.component';

import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { CalendarModule } from 'primeng/calendar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VoterFindCoordinatesComponent } from './voter-find-coordinates/voter-find-coordinates.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    IndexComponent,
    VoterFindCoordinatesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VotersRoutingModule,
    GoogleMapsModule,
    CardModule,
    DynamicDialogModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    MenuModule,
    ScrollPanelModule,
    SidebarModule
  ]
})
export class VotersModule { }
