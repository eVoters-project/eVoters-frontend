import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./index/index.component";
import { NgModule } from "@angular/core";
import { ElectionScheduleComponent } from "./election-schedule/election-schedule.component";
import { ElectionPositionComponent } from "./election-position/election-position.component";

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
