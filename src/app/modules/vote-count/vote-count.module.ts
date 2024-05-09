import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoteCountRoutingModule } from './vote-count-routing.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    VoteCountRoutingModule
  ]
})
export class VoteCountModule { }
