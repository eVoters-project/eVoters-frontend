import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'campaign',
    loadChildren: () => import('./modules/campaign/campaign.module').then(m => m.CampaignModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'leader',
    loadChildren: () => import('./modules/leader/leader.module').then(m => m.LeaderModule)
  },
  {
    path: 'party',
    loadChildren: () => import('./modules/party/party.module').then(m => m.PartyModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'straw-vote',
    loadChildren: () => import('./modules/straw-vote/straw-vote.module').then(m => m.StrawVoteModule)
  },
  {
    path: 'vote-count',
    loadChildren: () => import('./modules/vote-count/vote-count.module').then(m => m.VoteCountModule)
  },
  {
    path: 'voters',
    loadChildren: () => import('./modules/voters/voters.module').then(m => m.VotersModule)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];
