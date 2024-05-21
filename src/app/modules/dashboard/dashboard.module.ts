import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { IndexComponent } from './index/index.component';
import { DashboardTotalsComponent } from './components/dashboard-totals/dashboard-totals.component';
import { DashboardBarangayGraphComponent } from './components/dashboard-barangay-graph/dashboard-barangay-graph.component';
import { DashboardLeadersTableComponent } from './components/dashboard-leaders-table/dashboard-leaders-table.component';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    IndexComponent,
    DashboardTotalsComponent,
    DashboardBarangayGraphComponent,
    DashboardLeadersTableComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    CardModule,
    ChartModule,
    DividerModule,
    TableModule,
  ]
})
export class DashboardModule { }
