import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ProvinceInterface, RegionInterface } from '../../../../interface';
import { JurisdictionRegionColumns } from '../definitions/jurisdiction-region.columns';
import { JurisdictionProvinceColumns } from '../definitions/jurisdiction-province.columns';

@Component({
  selector: 'app-jurisdiction-province',
  templateUrl: './jurisdiction-province.component.html',
  styleUrl: './jurisdiction-province.component.scss'
})
export class JurisdictionProvinceComponent {

  // protected voterService = inject(VoterService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = JurisdictionProvinceColumns;
  protected provinces: ProvinceInterface[] = [];

  protected isLoading = false;

}
