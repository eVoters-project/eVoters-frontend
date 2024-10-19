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

@NgModule({
  declarations: [
    IndexComponent,
    JurisdictionPurokComponent,
    JurisdictionBarangayComponent,
    JurisdictionLguComponent,
    JurisdictionProvinceComponent,
    JurisdictionRegionComponent
  ],
  imports: [
    CommonModule,
    SettingsJurisdictionRoutingModule,
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
export class JurisdictionModule { }
