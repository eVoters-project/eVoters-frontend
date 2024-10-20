import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { VoterBaseColumns } from '../definition/voter-base.columns';
import { VoterBaseInterface } from '../../../../interface';

@Component({
  selector: 'app-voter-base',
  templateUrl: './voter-base.component.html',
  styleUrl: './voter-base.component.scss'
})
export class VoterBaseComponent {
  // protected voterService = inject(VoterService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = VoterBaseColumns;
  protected voterbases!: VoterBaseInterface[];

  protected isLoading = false;
}
