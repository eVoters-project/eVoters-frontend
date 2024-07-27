import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StrawVoteRoutingModule } from './straw-vote-routing.module';
import { IndexComponent } from './index/index.component';
import { StrawVoteEntryComponent } from './straw-vote-entry/straw-vote-entry.component';


@NgModule({
  declarations: [
    IndexComponent,
    StrawVoteEntryComponent
  ],
  imports: [
    CommonModule,
    StrawVoteRoutingModule
  ]
})
export class StrawVoteModule { }
