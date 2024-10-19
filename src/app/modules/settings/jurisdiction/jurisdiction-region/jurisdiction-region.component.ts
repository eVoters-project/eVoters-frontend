import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { RegionInterface } from '../../../../interface';
import { JurisdictionRegionColumns } from '../definitions/jurisdiction-region.columns';

@Component({
  selector: 'app-jurisdiction-region',
  templateUrl: './jurisdiction-region.component.html',
  styleUrl: './jurisdiction-region.component.scss'
})
export class JurisdictionRegionComponent {

  // protected voterService = inject(VoterService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = JurisdictionRegionColumns;
  protected regions: RegionInterface[] = [];

  protected isLoading = false;

}
