import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SettingsJurisdictionRoutingModule } from "./jurisdiction-routing.module";
import { IndexComponent } from "./index/index.component";
import { SettingsSharedModule } from "../settings-shared.module";
import { ToastModule } from "primeng/toast";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { JurisdictionBarangayComponent } from "./jurisdiction-barangay/jurisdiction-barangay.component";
import { JurisdictionLguComponent } from "./jurisdiction-lgu/jurisdiction-lgu.component";
import { JurisdictionProvinceComponent } from "./jurisdiction-province/jurisdiction-province.component";
import { JurisdictionPurokComponent } from "./jurisdiction-purok/jurisdiction-purok.component";
import { JurisdictionRegionComponent } from "./jurisdiction-region/jurisdiction-region.component";
import { TableModule } from "primeng/table";
import { DialogService } from "primeng/dynamicdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { JurisdictionBarangayUpsertComponent } from './jurisdiction-barangay-upsert/jurisdiction-barangay-upsert.component';
import { JurisdictionPurokUpsertComponent } from './jurisdiction-purok-upsert/jurisdiction-purok-upsert.component';
import { JurisdictionLguUpsertComponent } from './jurisdiction-lgu-upsert/jurisdiction-lgu-upsert.component';
import { JurisdictionProvinceUpsertComponent } from './jurisdiction-province-upsert/jurisdiction-province-upsert.component';
import { JurisdictionRegionUpsertComponent } from './jurisdiction-region-upsert/jurisdiction-region-upsert.component';
import { DropdownModule } from "primeng/dropdown";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";

@NgModule({
  declarations: [
    IndexComponent,
    JurisdictionPurokComponent,
    JurisdictionBarangayComponent,
    JurisdictionLguComponent,
    JurisdictionProvinceComponent,
    JurisdictionRegionComponent,
    JurisdictionBarangayUpsertComponent,
    JurisdictionPurokUpsertComponent,
    JurisdictionLguUpsertComponent,
    JurisdictionProvinceUpsertComponent,
    JurisdictionRegionUpsertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsJurisdictionRoutingModule,
    SettingsSharedModule,
    ToastModule,
    ConfirmDialogModule,
    TableModule,
    DropdownModule,
    ScrollPanelModule,
    InputTextModule
  ],
  providers: [
    DialogService,
    ConfirmationService,
    MessageService
  ]
})
export class JurisdictionModule { }
