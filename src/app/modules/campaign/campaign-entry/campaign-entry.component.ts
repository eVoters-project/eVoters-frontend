import { Component } from '@angular/core';
import { Status } from '../../../data';

@Component({
  selector: 'app-campaign-entry',
  templateUrl: './campaign-entry.component.html',
  styleUrl: './campaign-entry.component.scss'
})
export class CampaignEntryComponent {
  isLoading = false;
  status = Status;

  constructor() { }

  campaignSave() {

  }

}
