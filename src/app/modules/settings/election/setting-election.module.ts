import { NgModule } from "@angular/core";
import { IndexComponent } from "./index/index.component";
import { CommonModule } from "@angular/common";
import { SettingElectionRoutingModule } from "./setting-election-routing.module";
import { SettingsSharedModule } from "../settings-shared.module";
import { ElectionScheduleUpsertComponent } from './election-schedule-upsert/election-schedule-upsert.component';
import { ElectionPositionUpsertComponent } from './election-position-upsert/election-position-upsert.component';
import { ElectionScheduleComponent } from "./election-schedule/election-schedule.component";
import { ElectionPositionComponent } from "./election-position/election-position.component";
import { ToastModule } from "primeng/toast";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogService } from "primeng/dynamicdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ElectionPrecinctComponent } from "./election-precinct/election-precinct.component";
import { ElectionPrecinctUpsertComponent } from "./election-precinct-upsert/election-precinct-upsert.component";
import { ElectionCandidateComponent } from "./election-candidate/election-candidate.component";
import { ElectionCandidateUpsertComponent } from "./election-candidate-upsert/election-candidate-upsert.component";
import { InputNumberModule } from "primeng/inputnumber";

@NgModule({
  declarations: [
    IndexComponent,
    ElectionScheduleComponent,
    ElectionScheduleUpsertComponent,
    ElectionPositionComponent,
    ElectionPositionUpsertComponent,
    ElectionPrecinctComponent,
    ElectionPrecinctUpsertComponent,
    ElectionCandidateComponent,
    ElectionCandidateUpsertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingElectionRoutingModule,
    SettingsSharedModule,
    ToastModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    InputTextareaModule,
    InputNumberModule,
    InputTextareaModule
  ],
  providers: [
    DialogService,
    ConfirmationService,
    MessageService
  ]
})
export class SettingElectionModule { }
