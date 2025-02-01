import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SettingsGeneralRoutingModule } from "./setting-general-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IndexComponent } from "./index/index.component";
import { SettingsSharedModule } from "../settings-shared.module";

@NgModule({
    declarations: [
        IndexComponent
    ],
    imports: [
        CommonModule,
        SettingsGeneralRoutingModule,
        SettingsSharedModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SettingGeneralModule {}