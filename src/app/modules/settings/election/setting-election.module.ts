import { NgModule } from "@angular/core";
import { IndexComponent } from "./index/index.component";
import { CommonModule } from "@angular/common";
import { SettingElectionRoutingModule } from "./setting-election-routing.module";
import { SettingsSharedModule } from "../settings-shared.module";
import { ElectionScheduleUpsertComponent } from './election-schedule-upsert/election-schedule-upsert.component';
import { ElectionPositionUpsertComponent } from './election-position-upsert/election-position-upsert.component';
import { ElectionScheduleComponent } from "./election-schedule/election-schedule.component";
import { ElectionPositionComponent } from "./election-position/election-position.component";

@NgModule({
  declarations: [
    IndexComponent,
    ElectionScheduleComponent,
    ElectionScheduleUpsertComponent,
    ElectionPositionComponent,
    ElectionPositionUpsertComponent
  ],
  imports: [
    CommonModule,
    SettingElectionRoutingModule,
    SettingsSharedModule
  ]
})
export class SettingElectionModule { }
