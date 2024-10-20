import { Component, inject } from '@angular/core';
import { VoterInfluenceSubColumns } from '../definition/voter-influence-sub.columns';
import { VoterInfluenceSubInterface } from '../../../../interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-voter-influence-sub',
  templateUrl: './voter-influence-sub.component.html',
  styleUrl: './voter-influence-sub.component.scss'
})
export class VoterInfluenceSubComponent {
  // protected voterService = inject(VoterService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = VoterInfluenceSubColumns;
  protected voterinfluencessub!: VoterInfluenceSubInterface[];

  protected isLoading = false;
}
