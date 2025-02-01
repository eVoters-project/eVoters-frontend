import { NgModule } from "@angular/core";
import { IndexComponent } from "./index/index.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SettingGeneralPositionRoutingModule } from "./settings-general-position-routing.module";
import { SettingsSharedModule } from "../../settings-shared.module";
import { UpsertComponent } from "./upsert/upsert.component";
import { ToastModule } from "primeng/toast";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TableModule } from "primeng/table";
import { DialogService } from "primeng/dynamicdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";

@NgModule({
    declarations: [
        IndexComponent,
        UpsertComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SettingGeneralPositionRoutingModule,
        SettingsSharedModule,
        ToastModule,
        ConfirmDialogModule,
        TableModule,
        DropdownModule,
        InputTextModule,
        InputTextareaModule
    ],
    providers: [
        DialogService,
        ConfirmationService,
        MessageService
    ]
})
export class SettingGeneralPositionModule {}