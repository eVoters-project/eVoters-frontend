import { Component, inject } from '@angular/core';
import { VoterTypeColumns } from '../definition/voter-type.columns';
import { VoterTypeInterface } from '../../../../interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-voter-type',
  templateUrl: './voter-type.component.html',
  styleUrl: './voter-type.component.scss'
})
export class VoterTypeComponent {
  // protected voterService = inject(VoterService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = VoterTypeColumns;
  protected votertypes!: VoterTypeInterface[];

  protected isLoading = false;
}
