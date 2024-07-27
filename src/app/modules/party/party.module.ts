import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartyRoutingModule } from './party-routing.module';
import { IndexComponent } from './index/index.component';
import { PartyEntryComponent } from './party-entry/party-entry.component';


@NgModule({
  declarations: [
    IndexComponent,
    PartyEntryComponent
  ],
  imports: [
    CommonModule,
    PartyRoutingModule
  ]
})
export class PartyModule { }
