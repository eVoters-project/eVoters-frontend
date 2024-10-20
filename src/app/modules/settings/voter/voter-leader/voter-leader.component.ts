import { Component, inject } from '@angular/core';
import { VoterLeaderColumns } from '../definition/voter-leader.columns';
import { VoterLeaderInterface } from '../../../../interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-voter-leader',
  templateUrl: './voter-leader.component.html',
  styleUrl: './voter-leader.component.scss'
})
export class VoterLeaderComponent {
  // protected voterService = inject(VoterService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = VoterLeaderColumns;
  protected voterleaders!: VoterLeaderInterface[];

  protected isLoading = false;
}
