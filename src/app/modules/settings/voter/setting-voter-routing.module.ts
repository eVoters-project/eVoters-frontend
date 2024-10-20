import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./index/index.component";
import { VoterBaseComponent } from "./voter-base/voter-base.component";
import { VoterInfluenceComponent } from "./voter-influence/voter-influence.component";
import { VoterInfluenceSubComponent } from "./voter-influence-sub/voter-influence-sub.component";
import { VoterLeaderComponent } from "./voter-leader/voter-leader.component";
import { VoterLeaderSubComponent } from "./voter-leader-sub/voter-leader-sub.component";
import { VoterPositionComponent } from "./voter-position/voter-position.component";
import { VoterStatusComponent } from "./voter-status/voter-status.component";
import { VoterTypeComponent } from "./voter-type/voter-type.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'voter-base',
        component: VoterBaseComponent,
        title: 'Settings | Voter Base'
      },
      {
        path: 'voter-influence',
        component: VoterInfluenceComponent,
        title: 'Settings | Voter Influence'
      },
      {
        path: 'voter-influence-sub',
        component: VoterInfluenceSubComponent,
        title: 'Settings | Voter Influence Sub'
      },
      {
        path: 'voter-leader',
        component: VoterLeaderComponent,
        title: 'Settings | Voter Leader'
      },
      {
        path: 'voter-leader-sub',
        component: VoterLeaderSubComponent,
        title: 'Settings | Voter Leader Sub'
      },
      {
        path: 'voter-position',
        component: VoterPositionComponent,
        title: 'Settings | Voter Position'
      },
      {
        path: 'voter-status',
        component: VoterStatusComponent,
        title: 'Settings | Voter Status'
      },
      {
        path: 'voter-type',
        component: VoterTypeComponent,
        title: 'Settings | Voter Type'
      },
      {
        path: '',
        redirectTo: 'voter-base',
        pathMatch: 'full'
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingVoterRoutingModule { }
