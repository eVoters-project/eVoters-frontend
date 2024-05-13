import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotersRoutingModule } from './voters-routing.module';
import { IndexComponent } from './index/index.component';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    VotersRoutingModule,

    CardModule,
    TableModule
  ]
})
export class VotersModule { }
