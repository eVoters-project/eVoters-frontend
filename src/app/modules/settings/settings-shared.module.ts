import { NgModule } from "@angular/core";
import { SettingsMenuComponent } from "./component/settings-menu/settings-menu.component";
import { SettingsSidebarComponent } from "./component/settings-sidebar/settings-sidebar.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    SettingsSidebarComponent,
    SettingsMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SettingsSidebarComponent,
    SettingsMenuComponent
  ]
})
export class SettingsSharedModule { }
