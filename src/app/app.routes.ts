import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LayoutComponent } from './modules/layout/layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    title: 'E-Voters | Auth'
  },
  {
    path: '',
    component: LayoutComponent,
    title: 'E-Voters | Home',
    children: [
      {
        path: 'campaign',
        loadChildren: () => import('./modules/campaign/campaign.module').then(m => m.CampaignModule),
        title: 'E-Voters | Campaign'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        title: 'E-Voters | Dashboard'
      },
      {
        path: 'leader',
        loadChildren: () => import('./modules/leader/leader.module').then(m => m.LeaderModule),
        title: 'E-Voters | Leader'
      },
      {
        path: 'party',
        loadChildren: () => import('./modules/party/party.module').then(m => m.PartyModule),
        title: 'E-Voters | Party'
      },
      {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule),
        title: 'E-Voters | Settings'
      },
      {
        path: 'straw-vote',
        loadChildren: () => import('./modules/straw-vote/straw-vote.module').then(m => m.StrawVoteModule),
        title: 'E-Voters | Straw-Vote'
      },
      {
        path: 'vote-count',
        loadChildren: () => import('./modules/vote-count/vote-count.module').then(m => m.VoteCountModule),
        title: 'E-Voters | Vote-Count'
      },
      {
        path: 'voters',
        loadChildren: () => import('./modules/voters/voters.module').then(m => m.VotersModule),
        title: 'E-Voters | Voters'
      },
    ]
  },
];
