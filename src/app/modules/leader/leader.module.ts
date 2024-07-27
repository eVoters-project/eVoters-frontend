import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaderRoutingModule } from './leader-routing.module';
import { IndexComponent } from './index/index.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    LeaderRoutingModule,

    ButtonModule
  ]
})
export class LeaderModule { }
