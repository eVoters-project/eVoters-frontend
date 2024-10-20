import { Component, inject } from '@angular/core';
import { VoterStatusColumns } from '../definition/voter-status.columns';
import { VoterStatusInterface } from '../../../../interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-voter-status',
  templateUrl: './voter-status.component.html',
  styleUrl: './voter-status.component.scss'
})
export class VoterStatusComponent {
  // protected voterService = inject(VoterService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = VoterStatusColumns;
  protected voterstatuses!: VoterStatusInterface[];

  protected isLoading = false;
}
