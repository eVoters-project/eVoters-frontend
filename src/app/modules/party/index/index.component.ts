import { Component, inject } from '@angular/core';
import { PartyGridColumns } from '../party.data';
import { PartyInterface } from '../../../interface/modules/party/party.interface';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'ev-party-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  title = 'Party';
  parties: PartyInterface[] | undefined | null;
  party: PartyInterface | undefined | null;
  isLoading = false;
  cols = PartyGridColumns;

  dialogService = inject(DialogService);

  partyEntry() {

  }
}
