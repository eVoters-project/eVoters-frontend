import { NgModule } from "@angular/core";
import { IndexComponent } from "./index/index.component";
import { CommonModule } from "@angular/common";
import { SettingVoterRoutingModule } from "./setting-voter-routing.module";

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    SettingVoterRoutingModule
  ]
})
export class SettingVoterModule { }
