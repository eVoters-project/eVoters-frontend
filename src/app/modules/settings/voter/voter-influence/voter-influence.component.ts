import { Component, inject } from '@angular/core';
import { VoterInfluenceColumns } from '../definition/voter-influence.columns';
import { VoterInfluenceInterface } from '../../../../interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-voter-influence',
  templateUrl: './voter-influence.component.html',
  styleUrl: './voter-influence.component.scss'
})
export class VoterInfluenceComponent {
  // protected voterService = inject(VoterService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = VoterInfluenceColumns;
  protected voterinfluences!: VoterInfluenceInterface[];

  protected isLoading = false;
}
