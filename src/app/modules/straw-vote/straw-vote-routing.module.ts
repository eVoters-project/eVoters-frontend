import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { StrawVoteDetailsComponent } from './straw-vote-details/straw-vote-details.component';
import { StrawVoteSummaryComponent } from './straw-vote-summary/straw-vote-summary.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'details',
        component: StrawVoteDetailsComponent,
        title: 'Straw Vote | Details'
      },
      {
        path: 'summary',
        component: StrawVoteSummaryComponent,
        title: 'Straw Vote | Summary'
      },
      {
        path: '',
        redirectTo: 'details',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrawVoteRoutingModule { }
