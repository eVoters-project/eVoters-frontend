import { RouterModule, Routes } from "@angular/router";
import { JurisdictionBarangayComponent } from "./jurisdiction-barangay/jurisdiction-barangay.component";
import { JurisdictionRegionComponent } from "./jurisdiction-region/jurisdiction-region.component";
import { JurisdictionProvinceComponent } from "./jurisdiction-province/jurisdiction-province.component";
import { JurisdictionLguComponent } from "./jurisdiction-lgu/jurisdiction-lgu.component";
import { JurisdictionPurokComponent } from "./jurisdiction-purok/jurisdiction-purok.component";
import { NgModule } from "@angular/core";
import { IndexComponent } from "../../settings/jurisdiction/index/index.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'purok',
        component: JurisdictionPurokComponent,
        title: 'Jurisdiction | Purok'
      },
      {
        path: 'barangay',
        component: JurisdictionBarangayComponent,
        title: 'Jurisdiction | Barangay'
      },
      {
        path: 'lgu',
        component: JurisdictionLguComponent,
        title: 'Jurisdiction | LGU'
      },
      {
        path: 'province',
        component: JurisdictionProvinceComponent,
        title: 'Jurisdiction | Province'
      },
      {
        path: 'region',
        component: JurisdictionRegionComponent,
        title: 'Jurisdiction | Region'
      },
      {
        path: '',
        redirectTo: 'purok',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsJurisdictionRoutingModule { }
