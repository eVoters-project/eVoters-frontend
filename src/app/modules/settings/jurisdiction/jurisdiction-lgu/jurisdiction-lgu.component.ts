import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { LGUInterface } from '../../../../interface';
import { JurisdictionLguColumns } from '../definitions/jurisdiction-lgu.columns';

@Component({
  selector: 'app-jurisdiction-lgu',
  templateUrl: './jurisdiction-lgu.component.html',
  styleUrl: './jurisdiction-lgu.component.scss'
})
export class JurisdictionLguComponent {

  // protected voterService = inject(VoterService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = JurisdictionLguColumns;
  protected lgus: LGUInterface[] = [];

  protected isLoading = false;

}
