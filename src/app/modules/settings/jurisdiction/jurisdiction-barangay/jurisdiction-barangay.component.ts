import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { BarangayInterface } from '../../../../interface';
import { JurisdictionBarangayColumns } from '../definitions/jurisdiction-barangay.columns';

@Component({
  selector: 'app-jurisdiction-barangay',
  templateUrl: './jurisdiction-barangay.component.html',
  styleUrl: './jurisdiction-barangay.component.scss'
})
export class JurisdictionBarangayComponent {

  // protected voterService = inject(VoterService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = JurisdictionBarangayColumns;
  protected barangays: BarangayInterface[] = [];

  protected isLoading = false;

}
