import { NgModule } from "@angular/core";
import { IndexComponent } from "./index/index.component";
import { CommonModule } from "@angular/common";
import { SettingVoterRoutingModule } from "./setting-voter-routing.module";
import { SettingsSharedModule } from "../settings-shared.module";
import { VoterBaseComponent } from "./voter-base/voter-base.component";
import { VoterInfluenceComponent } from "./voter-influence/voter-influence.component";
import { VoterInfluenceSubComponent } from "./voter-influence-sub/voter-influence-sub.component";
import { VoterLeaderComponent } from "./voter-leader/voter-leader.component";
import { VoterLeaderSubComponent } from "./voter-leader-sub/voter-leader-sub.component";
import { VoterPositionComponent } from "./voter-position/voter-position.component";
import { VoterStatusComponent } from "./voter-status/voter-status.component";
import { VoterTypeComponent } from "./voter-type/voter-type.component";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";

@NgModule({
  declarations: [
    IndexComponent,
    VoterBaseComponent,
    VoterInfluenceComponent,
    VoterInfluenceSubComponent,
    VoterLeaderComponent,
    VoterLeaderSubComponent,
    VoterPositionComponent,
    VoterStatusComponent,
    VoterTypeComponent
  ],
  imports: [
    CommonModule,
    SettingVoterRoutingModule,
    SettingsSharedModule,
    ToastModule,
    ConfirmDialogModule,
    TableModule
  ],
  providers: [
    DialogService,
    ConfirmationService,
    MessageService
  ]
})
export class SettingVoterModule { }
