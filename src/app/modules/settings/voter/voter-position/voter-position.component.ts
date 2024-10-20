import { Component, inject } from '@angular/core';
import { VoterPositionColumns } from '../definition/voter-position.columns';
import { VoterPositionInterface } from '../../../../interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-voter-position',
  templateUrl: './voter-position.component.html',
  styleUrl: './voter-position.component.scss'
})
export class VoterPositionComponent {
  // protected voterService = inject(VoterService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = VoterPositionColumns;
  protected voterpositions!: VoterPositionInterface[];

  protected isLoading = false;
}
