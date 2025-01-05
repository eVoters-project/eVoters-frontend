import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ElectionCandidateService } from '../service/election-candidate.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ElectionCandidateInterface } from '../../../../interface';
import { ElectionCandidateColumn } from '../definition/election-candidate.column';
import { ElectionCandidateApiService } from '../../../../service/api';

@Component({
  selector: 'app-election-candidate',
  templateUrl: './election-candidate.component.html',
  styleUrl: './election-candidate.component.scss',
  providers: [
    ElectionCandidateService,
    ElectionCandidateApiService
  ]
})
export class ElectionCandidateComponent implements OnInit, OnDestroy, AfterViewInit {
  protected electionPrecinctService = inject(ElectionCandidateService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  private arr_subs = new Array<Subscription>();

  protected cols = ElectionCandidateColumn;
  protected electionCandidates: ElectionCandidateInterface[] = [];

  protected isLoading = false;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {

  }

  electionCandidateEntry() {

  }
}
