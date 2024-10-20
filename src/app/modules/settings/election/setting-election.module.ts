import { NgModule } from "@angular/core";
import { IndexComponent } from "./index/index.component";
import { CommonModule } from "@angular/common";
import { SettingElectionRoutingModule } from "./setting-election-routing.module";
import { SettingsSharedModule } from "../settings-shared.module";

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    SettingElectionRoutingModule,
    SettingsSharedModule
  ]
})
export class SettingElectionModule { }
