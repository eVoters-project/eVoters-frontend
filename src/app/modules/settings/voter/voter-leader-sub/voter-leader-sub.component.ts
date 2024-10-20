import { Component, inject } from '@angular/core';
import { VoterLeaderSubColumns } from '../definition/voter-leader-sub.columns';
import { VoterLeaderSubInterface } from '../../../../interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-voter-leader-sub',
  templateUrl: './voter-leader-sub.component.html',
  styleUrl: './voter-leader-sub.component.scss'
})
export class VoterLeaderSubComponent {
  // protected voterService = inject(VoterService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = VoterLeaderSubColumns;
  protected voterleaderssub!: VoterLeaderSubInterface[];

  protected isLoading = false;
}
