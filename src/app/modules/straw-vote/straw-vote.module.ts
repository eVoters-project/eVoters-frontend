import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StrawVoteRoutingModule } from './straw-vote-routing.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    StrawVoteRoutingModule
  ]
})
export class StrawVoteModule { }
