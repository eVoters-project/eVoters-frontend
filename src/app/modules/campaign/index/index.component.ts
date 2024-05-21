import { Component } from '@angular/core';
import { CampaignColumns } from '../data/campaign.column';
import { CampaignInterface } from '../data/interface';

@Component({
  selector: 'ev-campaign-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  title = 'Campaign';

  cols = CampaignColumns;
  campaign!: CampaignInterface[];

}
