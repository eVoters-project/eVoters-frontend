import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotersRoutingModule } from './voters-routing.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    VotersRoutingModule
  ]
})
export class VotersModule { }
