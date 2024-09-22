import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PerRankComponent } from './per-rank/per-rank.component';
import { PerPositionComponent } from './per-position/per-position.component';
import { PerLocationComponent } from './per-location/per-location.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'per-rank',
        component: PerRankComponent,
        title: 'Vote Count | Per Rank'
      },
      {
        path: 'per-position',
        component: PerPositionComponent,
        title: 'Vote Count | Per Position'
      },
      {
        path: 'per-location',
        component: PerLocationComponent,
        title: 'Vote Count | Per Location'
      },
      {
        path: '',
        redirectTo: 'per-rank',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoteCountRoutingModule { }
