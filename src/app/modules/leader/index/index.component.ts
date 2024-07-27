import { Component, inject } from '@angular/core';
import { LeaderInterface } from '../../../interface/modules/leader/leader.interface';
import { LeaderGridColumns } from '../data/leader.column';
import { LeaderEntryComponent } from '../leader-entry/leader-entry.component';
import { DialogService } from 'primeng/dynamicdialog';
import { LeaderService } from '../leader.service';

@Component({
  selector: 'ev-leader-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  protected leaderService = inject(LeaderService);
  private dialogService = inject(DialogService);

  title = 'Leader'
  isLoading = false;

  leaders!: LeaderInterface[];
  leader!: LeaderInterface;

  cols = LeaderGridColumns;

  leaderEntry() {
    const ref = this.dialogService
      .open(LeaderEntryComponent, {
        header: 'New Leader',
        footer: ' ',
        position: 'right',
        modal: true,
        width: '45rem',
        height: '45rem'
      });
  }
}
