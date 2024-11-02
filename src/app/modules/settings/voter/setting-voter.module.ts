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
import { VoterBaseUpsertComponent } from "./voter-base-upsert/voter-base-upsert.component";
import { VoterInfluenceUpsertComponent } from "./voter-influence-upsert/voter-influence-upsert.component";
import { VoterLeaderUpsertComponent } from "./voter-leader-upsert/voter-leader-upsert.component";
import { VoterLeaderSubUpsertComponent } from "./voter-leader-sub-upsert/voter-leader-sub-upsert.component";
import { VoterPositionUpsertComponent } from "./voter-position-upsert/voter-position-upsert.component";
import { VoterStatusUpsertComponent } from "./voter-status-upsert/voter-status-upsert.component";
import { VoterTypeUpsertComponent } from "./voter-type-upsert/voter-type-upsert.component";
import { VoterInfluenceSubUpsertComponent } from "./voter-influence-sub-upsert/voter-influence-sub-upsert.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextareaModule } from "primeng/inputtextarea";

@NgModule({
  declarations: [
    IndexComponent,
    VoterBaseComponent,
    VoterBaseUpsertComponent,
    VoterInfluenceComponent,
    VoterInfluenceUpsertComponent,
    VoterInfluenceSubComponent,
    VoterInfluenceSubUpsertComponent,
    VoterLeaderComponent,
    VoterLeaderUpsertComponent,
    VoterLeaderSubComponent,
    VoterLeaderSubUpsertComponent,
    VoterPositionComponent,
    VoterPositionUpsertComponent,
    VoterStatusComponent,
    VoterStatusUpsertComponent,
    VoterTypeComponent,
    VoterTypeUpsertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingVoterRoutingModule,
    SettingsSharedModule,
    ToastModule,
    ConfirmDialogModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    InputTextareaModule
  ],
  providers: [
    DialogService,
    ConfirmationService,
    MessageService
  ]
})
export class SettingVoterModule { }
