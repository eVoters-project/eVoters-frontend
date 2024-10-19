import { NgModule } from "@angular/core";
import { IndexComponent } from "./index/index.component";
import { CommonModule } from "@angular/common";
import { SettingElectionRoutingModule } from "./setting-election-routing.module";

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    SettingElectionRoutingModule
  ]
})
export class SettingElectionModule { }
