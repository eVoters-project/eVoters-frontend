import { Component } from '@angular/core';
import { Status } from '../../../data';

@Component({
  selector: 'app-party-entry',
  templateUrl: './party-entry.component.html',
  styleUrl: './party-entry.component.scss'
})
export class PartyEntryComponent {
  isLoading = false;
  status = Status;

  partySave() {

  }
}
