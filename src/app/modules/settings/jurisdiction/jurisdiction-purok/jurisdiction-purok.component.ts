import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { PurokInterface } from '../../../../interface';
import { JurisdictionPurokColumns } from '../definitions/jurisdiction-purok.columns';

@Component({
  selector: 'app-jurisdiction-purok',
  templateUrl: './jurisdiction-purok.component.html',
  styleUrl: './jurisdiction-purok.component.scss'
})
export class JurisdictionPurokComponent {

  // protected voterService = inject(VoterService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = JurisdictionPurokColumns;
  protected puroks: PurokInterface[] = [];

  protected isLoading = false;

}
