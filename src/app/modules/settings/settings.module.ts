import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { IndexComponent } from './index/index.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { SettingsSharedModule } from './settings-shared.module';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    SettingsSharedModule,
    SettingsRoutingModule,
    TabMenuModule
  ]
})
export class SettingsModule { }
