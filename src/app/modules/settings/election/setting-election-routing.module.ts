import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./index/index.component";
import { NgModule } from "@angular/core";
import { ElectionScheduleComponent } from "./election-schedule/election-schedule.component";
import { ElectionPositionComponent } from "./election-position/election-position.component";
import { ElectionPrecinctComponent } from "./election-precinct/election-precinct.component";
import { ElectionCandidateComponent } from "./election-candidate/election-candidate.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'schedule',
        component: ElectionScheduleComponent,
        title: 'Settings | Election Schedule'
      },
      {
        path: 'position',
        component: ElectionPositionComponent,
        title: 'Settings | Election Position'
      },
      {
        path: 'precinct',
        component: ElectionPrecinctComponent,
        title: 'Settings | Election Precinct'
      },
      {
        path: 'candidate',
        component: ElectionCandidateComponent,
        title: 'Settings | Election Candidate'
      },
      {
        path: '',
        redirectTo: 'schedule',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingElectionRoutingModule { }
