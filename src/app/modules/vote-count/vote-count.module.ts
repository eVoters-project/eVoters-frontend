import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoteCountRoutingModule } from './vote-count-routing.module';
import { IndexComponent } from './index/index.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VoteCountRoutingModule,
    TabMenuModule,
    RadioButtonModule
  ]
})
export class VoteCountModule { }
