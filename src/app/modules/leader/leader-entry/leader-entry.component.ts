import { Component } from '@angular/core';
import { Status } from '../../../data';

@Component({
  selector: 'app-leader-entry',
  templateUrl: './leader-entry.component.html',
  styleUrl: './leader-entry.component.scss'
})
export class LeaderEntryComponent {
  isLoading = false;
  status = Status;
  
  leaderSave() {
    
  }
}
