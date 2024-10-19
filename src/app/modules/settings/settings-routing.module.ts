import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'jurisdiction',
        loadChildren: () => import('./jurisdiction/jurisdiction.module').then(m => m.JurisdictionModule)
      },
      {
        path: 'election',
        loadChildren: () => import('./election/setting-election.module').then(m => m.SettingElectionModule)
      },
      {
        path: 'voter',
        loadChildren: () => import('./voter/setting-voter.module').then(m => m.SettingVoterModule)
      },
      {
        path: '',
        redirectTo: 'jurisdiction',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
