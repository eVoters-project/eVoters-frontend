import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./index/index.component";

const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        children: [
          {
            path: 'position',
            loadChildren: () => import('./position/settings-general-position.module').then(m => m.SettingGeneralPositionModule)
          },
          {
            path: '',
            redirectTo: 'position',
            pathMatch: 'full'
          }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsGeneralRoutingModule {}