import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CampaignEventComponent } from './campaign-event/campaign-event.component';
import { CampaignSmsComponent } from './campaign-sms/campaign-sms.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'event',
        component: CampaignEventComponent,
        title: 'Campaign | Event'
      },
      {
        path: 'sms',
        component: CampaignSmsComponent,
        title: 'Campaign | SMS'
      },
      {
        path: '',
        redirectTo: 'event',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
